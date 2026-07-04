import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environmental variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Set up JSON Database directory (for OTP logs)
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// In-Memory store for pending registration OTP verification
// email -> { code, expires, payload: { firstName, lastName, email, phone, password, role } }
interface PendingRegistration {
  code: string;
  expires: number;
  payload: any;
}
const pendingRegistrationStore = new Map<string, PendingRegistration>();

// SMTP transporter setup
const gmailUser = process.env.GMAIL_USER || '';
const gmailPassword = process.env.GMAIL_APP_PASSWORD || '';
const hostIsPlaceholder = gmailUser === 'your_email@gmail.com' || gmailPassword === 'your_app_password';
const useRealSmtp = gmailUser.length > 0 && gmailPassword.length > 0 && !hostIsPlaceholder;

// Configuration options from environment variables
const jwtSecret = process.env.SECRET_KEY || process.env.JWT_SECRET || 'super_secret';
const otpExpireMinutes = parseInt(process.env.OTP_EXPIRE_MINUTES || '5', 10);
const tokenExpiry = process.env.ACCESS_TOKEN_EXPIRE_MINUTES 
  ? parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES, 10) * 60 
  : 24 * 60 * 60;

// Initialize Supabase Client
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
let supabase: ReturnType<typeof createClient>;

if (!supabaseUrl || !supabaseKey) {
  console.warn('[Supabase] VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY missing. Authentication will fail.');
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

let transporter: nodemailer.Transporter | null = null;
if (useRealSmtp) {
  console.log(`[SMTP] Configuring Real Gmail SMTP for user: ${gmailUser}`);
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });
} else {
  console.log('[SMTP] SMTP Credentials not fully configured or are placeholders. Running in Dev Mock Mode.');
}

// Helper to send registration verification emails
async function sendVerificationEmail(email: string, code: string, payload: any) {
  const mailOptions = {
    from: `"XelCo identity Service" <${gmailUser || 'security@xelco.com'}>`,
    to: email,
    subject: 'XelCo Smartbin App - Verify Operator Provisioning',
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05);">
        <div style="text-align: center; margin-bottom: 24px;">
          <span style="font-size: 24px; font-weight: bold; color: #1e3a8a;">XelCo <span style="color: #2563eb;">InfraTechnologies</span></span>
        </div>
        <h2 style="color: #1e293b; font-size: 20px; font-weight: 600; margin-top: 0;">Verify Operator Provisioning Code</h2>
        <p style="color: #475569; line-height: 1.6;">Hello ${payload.firstName || 'Operator'},</p>
        <p style="color: #475569; line-height: 1.6;">Please enter the following 6-digit verification code to complete your operator account registration.</p>
        
        <div style="background-color: #f8fafc; text-align: center; font-size: 36px; font-weight: 800; letter-spacing: 6px; padding: 18px; margin: 24px 0; color: #2563eb; border: 1px solid #e2e8f0; border-radius: 8px;">
          ${code}
        </div>
        
        <p style="color: #dc2626; font-size: 14px; font-weight: 500;">This code is valid for ${otpExpireMinutes} minutes. Do not share it with anyone.</p>
        <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0;" />
        <p style="font-size: 12px; color: #94a3b8; line-height: 1.5; text-align: center;">
          This email was sent dynamically by the XelCo Identity Service. If you did not request this verification, please contact admin@xelco.com.
        </p>
      </div>
    `
  };

  if (useRealSmtp && transporter) {
    await transporter.sendMail(mailOptions);
  } else {
    // Mock sending by logging out the OTP in terminal
    console.log(`\n======================================================`);
    console.log(`📧 [MOCK EMAIL DISPATCH TO]: ${email}`);
    console.log(`🔑 [REGISTRATION OTP VERIFICATION CODE]: ${code}`);
    console.log(`👤 [OPERATOR DETAILS]: Name: ${payload.firstName} ${payload.lastName}, Role: ${payload.role}`);
    console.log(`======================================================\n`);
  }
  
  // Write to debug JSON file
  fs.writeFileSync(path.join(dataDir, 'otp_debug.json'), JSON.stringify({ email, code, timestamp: Date.now() }, null, 2));
}

// REST Routes

// 1. Operator Provisioning Request - Generate verification code & store payload
app.post('/api/auth/register-request', async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

    if (!firstName || !lastName || !email || !phone || !password || !role) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (!supabase) return res.status(500).json({ error: 'Database service not configured.' });

    const emailLower = email.trim().toLowerCase();
    
    // Use Supabase instead of SQLite
    const { data: existingUser, error: dbError } = await supabase
      .from('users')
      .select('email')
      .eq('email', emailLower)
      .maybeSingle() as { data: any, error: any };

    if (dbError) {
      console.error('Supabase error checking existing user:', dbError);
      return res.status(500).json({ error: 'Database error checking user.' });
    }

    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    // Generate 6-Digit Code
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in mapping with configured expiry
    pendingRegistrationStore.set(emailLower, {
      code,
      expires: Date.now() + otpExpireMinutes * 60 * 1000,
      payload: { firstName, lastName, email: emailLower, phone, password, role }
    });

    // Send email
    await sendVerificationEmail(emailLower, code, { firstName, lastName, role });

    return res.json({ 
      success: true, 
      message: useRealSmtp 
        ? 'Verification code sent to your email.' 
        : 'Verification code sent (Dev Mock Mode). See server terminal logs or data/otp_debug.json.' 
    });

  } catch (error: any) {
    console.error('Error generating registration code:', error);
    return res.status(500).json({ error: 'Failed to process request. Please check server logs.' });
  }
});

// 2. Operator Register Verification - Submit code & write user
app.post('/api/auth/register-verify', async (req: express.Request, res: express.Response) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ error: 'Email and verification code are required.' });
    }

    if (!supabase) return res.status(500).json({ error: 'Database service not configured.' });

    const emailLower = email.trim().toLowerCase();
    const pending = pendingRegistrationStore.get(emailLower);

    if (!pending) {
      return res.status(400).json({ error: 'No active registration request found. Go back and request code.' });
    }

    if (Date.now() > pending.expires) {
      pendingRegistrationStore.delete(emailLower);
      return res.status(400).json({ error: 'Verification code has expired. Request a new one.' });
    }

    if (pending.code !== code.trim()) {
      return res.status(400).json({ error: 'Incorrect verification code entered.' });
    }

    // Code verified: delete pending record
    pendingRegistrationStore.delete(emailLower);

    // Make sure they didn't get created in the meantime
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', emailLower)
      .maybeSingle() as { data: any, error: any };

    if (existingUser) {
      return res.status(400).json({ error: 'This email is already registered.' });
    }

    const { firstName, lastName, phone, password, role } = pending.payload;
    const newUser = {
      email: emailLower,
      password, // In a real app, hash this before saving! (e.g. bcrypt)
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      phone,
      role
      // createdAt is handled by Postgres default now()
    };

    const { error: insertError } = await supabase
      .from('users')
      .insert([newUser] as any);

    if (insertError) {
      console.error('Supabase write error:', insertError);
      return res.status(500).json({ error: 'Failed to save new user to database.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { email: newUser.email, name: newUser.name, role: newUser.role },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    return res.json({
      success: true,
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
        role: newUser.role
      }
    });

  } catch (error: any) {
    console.error('Error verifying registration code:', error);
    return res.status(500).json({ error: 'Failed to register account. Check server logs.' });
  }
});

// 3. Operator Login - Verify email & password
app.post('/api/auth/login', async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and Password are required.' });
    }

    if (!supabase) return res.status(500).json({ error: 'Database service not configured.' });

    const emailLower = email.trim().toLowerCase();
    
    const { data: user, error: dbError } = await supabase
      .from('users')
      .select('*')
      .eq('email', emailLower)
      .maybeSingle() as { data: any, error: any };

    if (dbError) {
      return res.status(500).json({ error: 'Database query failed.' });
    }

    if (!user) {
      return res.status(404).json({ error: 'No operator profile matching this email was found.' });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password. Please try again.' });
    }

    // Sign JWT
    const token = jwt.sign(
      { email: user.email, name: user.name, role: user.role },
      jwtSecret,
      { expiresIn: tokenExpiry }
    );

    return res.json({
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
        role: user.role
      }
    });

  } catch (error) {
    console.error('Error logging in:', error);
    return res.status(500).json({ error: 'Failed to sign in. Check server logs.' });
  }
});

// 4. Token validation middleware check
app.get('/api/auth/me', (req: express.Request, res: express.Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized credentials.' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret) as any;
    return res.json({
      success: true,
      user: {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role
      }
    });
  } catch (error) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
});

// 4b. Profile endpoint – returns full user record from DB
app.get('/api/auth/profile', async (req: express.Request, res: express.Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized credentials.' });
    }
    if (!supabase) return res.status(500).json({ error: 'Database service not configured.' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, jwtSecret) as any;
    
    const { data: user, error: dbError } = await supabase
      .from('users')
      .select('email, "firstName", "lastName", name, phone, role, "createdAt"')
      .eq('email', decoded.email)
      .maybeSingle() as { data: any, error: any };

    if (dbError || !user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({
      success: true,
      user: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        phone: user.phone,
        role: user.role,
        organization: 'XelCo Engineering College',
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    return res.status(401).json({ error: 'Session expired. Please log in again.' });
  }
});

// 5. Testing Helper - Retrieve last generated registration/login OTP code
app.get('/api/auth/last-otp', (req: express.Request, res: express.Response) => {
  const entries = Array.from(pendingRegistrationStore.entries());
  if (entries.length === 0) {
    // If no registrations, maybe check otp_debug.json
    try {
      const debugFile = path.join(dataDir, 'otp_debug.json');
      if (fs.existsSync(debugFile)) {
        return res.json(JSON.parse(fs.readFileSync(debugFile, 'utf-8')));
      }
    } catch (e) {}
    return res.status(404).json({ error: 'No OTP currently registered.' });
  }
  const lastEntry = entries[entries.length - 1];
  return res.json({
    email: lastEntry[0],
    code: lastEntry[1].code
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Authentication Backend Server running on http://localhost:${PORT}`);
  if (supabaseUrl) {
    console.log(`📦 Database: Connected to Supabase at ${supabaseUrl}`);
  } else {
    console.log(`⚠️ Database: SUPABASE_URL missing, DB queries will fail.`);
  }
});
