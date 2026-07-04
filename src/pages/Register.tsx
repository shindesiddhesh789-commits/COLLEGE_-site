import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { 
  User, Mail, Phone, Lock, CircuitBoard, ShieldCheck, CheckCircle2, ArrowLeft, Key 
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Register() {
  const navigate = useNavigate();
  const { registerRequest, registerVerify, error: authError, clearError } = useAuth();

  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Admin');
  const [consent, setConsent] = useState(false);
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [countdown, setCountdown] = useState(0);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timerId = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timerId);
    }
  }, [countdown]);

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    const errors: Record<string, string> = {};
    if (!firstName.trim()) errors.firstName = 'First name is required.';
    if (!lastName.trim()) errors.lastName = 'Last name is required.';
    if (!email.trim()) errors.email = 'Official Email is required.';
    if (!phone.trim()) errors.phone = 'Phone number is required.';
    if (!password) errors.password = 'Password is required.';
    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';
    if (!consent) errors.consent = 'You must consent to register.';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setLoading(true);
    const result = await registerRequest({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });
    setLoading(false);

    if (result.success) {
      setStep('verify');
      setFeedbackMessage(result.message);
      setCountdown(60);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setFormErrors({});

    if (!otp.trim()) {
      setFormErrors({ otp: 'Verification code is required.' });
      return;
    }
    if (otp.length < 6) {
      setFormErrors({ otp: 'Code must be 6 digits.' });
      return;
    }

    setLoading(true);
    const result = await registerVerify(email, otp);
    setLoading(false);

    if (result.success) {
      navigate('/dashboard');
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0) return;
    setLoading(true);
    const result = await registerRequest({
      firstName,
      lastName,
      email,
      phone,
      password,
      role
    });
    setLoading(false);
    if (result.success) {
      setFeedbackMessage(result.message);
      setCountdown(60);
      setOtp('');
    }
  };

  const handleAutoFillOtp = async () => {
    try {
      const res = await fetch('/api/auth/last-otp');
      if (res.ok) {
        const data = await res.json();
        if (data.code) {
          setOtp(data.code);
        }
      }
    } catch (err) {
      console.error('Failed to autofill OTP:', err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 relative">
      {/* Back button */}
      <div className="absolute top-6 left-6">
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold">Back to Login</span>
        </button>
      </div>

      <div className="w-full max-w-[560px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-slate-100/80 overflow-hidden">
        {/* Card Header Banner (Teal / Dark Cyan) */}
        <div className="bg-[#009688] text-white py-6 px-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-2.5">
            <img src="/logo.png" alt="XelCo InfraTechnologies" className="h-16 object-contain brightness-0" />
          </div>

        </div>

        {/* Card Body */}
        <div className="p-8">
          {step === 'request' ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 font-display">Operator Provisioning</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Register for XIT terminal access
                </p>
              </div>

              {/* Validation & Auth Errors */}
              {(authError || formErrors.general) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-lg text-xs leading-normal flex items-start space-x-2">
                  <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{authError || formErrors.general}</span>
                </div>
              )}

              <form onSubmit={handleRequestOtp} className="space-y-4">
                {/* First and Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">First Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="First"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                          formErrors.firstName ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                        }`}
                        required
                      />
                    </div>
                    {formErrors.firstName && <span className="text-[10px] text-red-500 block">{formErrors.firstName}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Last Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Last"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                          formErrors.lastName ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                        }`}
                        required
                      />
                    </div>
                    {formErrors.lastName && <span className="text-[10px] text-red-500 block">{formErrors.lastName}</span>}
                  </div>
                </div>

                {/* Official Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Official Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      placeholder="operator@xelco.in"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                        formErrors.email ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.email && <span className="text-xs text-red-500">{formErrors.email}</span>}
                </div>

                {/* Phone Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                        formErrors.phone ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                      }`}
                      required
                    />
                  </div>
                  {formErrors.phone && <span className="text-xs text-red-500">{formErrors.phone}</span>}
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                          formErrors.password ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                        }`}
                        required
                      />
                    </div>
                    {formErrors.password && <span className="text-[10px] text-red-500 block">{formErrors.password}</span>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 block">Confirm Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={`flex h-11 w-full rounded-lg border bg-[#f0fdf4]/30 px-10 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all ${
                          formErrors.confirmPassword ? 'border-red-400 focus-visible:ring-red-400' : 'border-slate-200 focus-visible:ring-primary'
                        }`}
                        required
                      />
                    </div>
                    {formErrors.confirmPassword && (
                      <span className="text-[10px] text-red-500 block">{formErrors.confirmPassword}</span>
                    )}
                  </div>
                </div>

                {/* Requested Access Level */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-600 block">Requested Access Level</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="flex h-11 w-full rounded-lg border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all appearance-none cursor-pointer"
                    >
                      <option value="Admin">Admin (System Control)</option>
                      <option value="Supervisor">Supervisor (Grid Manager)</option>
                      <option value="Housekeeping Staff">Housekeeping Staff (Field Custodian)</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-500 w-0 h-0"></div>
                  </div>
                </div>

                {/* Consent checkbox */}
                <div className="pt-2">
                  <label className="flex items-start cursor-pointer select-none space-x-3">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="w-4 h-4 text-primary rounded bg-slate-50 border-slate-200 focus:ring-primary mt-1 cursor-pointer"
                      required
                    />
                    <div className="text-slate-500 text-[11px] leading-tight">
                      <span className="font-semibold text-slate-700">I Consent</span>
                      <p className="mt-0.5 text-slate-400">
                        I agree to the Terms and Conditions & Privacy Policy. My consent timestamp will be recorded.
                      </p>
                    </div>
                  </label>
                  {formErrors.consent && <span className="text-xs text-red-500 block mt-1">{formErrors.consent}</span>}
                </div>

                <Button
                  type="submit"
                  className="w-full justify-center bg-primary hover:bg-primary-hover text-white rounded-lg h-11 text-xs font-semibold cursor-pointer duration-200 transition-colors mt-2"
                  isLoading={loading}
                  disabled={loading}
                >
                  Verify Email
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* OTP Validation Screen */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800 font-display">Enter Verification Code</h2>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  A 6-digit OTP code has been issued to <strong className="text-slate-600">{email}</strong>.
                </p>
              </div>

              {/* Notification Banner */}
              {feedbackMessage && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-100/80 text-emerald-800 rounded-lg text-xs leading-normal flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="font-semibold">{feedbackMessage}</span>
                  </div>
                </div>
              )}

              {/* Validation & Auth Errors */}
              {(authError || formErrors.otp) && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-500 rounded-lg text-xs leading-normal flex items-start space-x-2">
                  <svg className="w-4 h-4 text-red-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{authError || formErrors.otp}</span>
                </div>
              )}

              <form onSubmit={handleVerifyOtp} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-600 block text-center">
                    Verification Code
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                      className="flex h-11 w-full rounded-lg border border-slate-200 bg-[#f0fdf4]/30 px-10 py-2 text-center text-md font-bold tracking-[6px] text-slate-800 placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full justify-center bg-primary hover:bg-primary-hover text-white rounded-lg h-11 text-xs font-semibold cursor-pointer duration-200 transition-colors"
                  isLoading={loading}
                  disabled={loading}
                >
                  Verify Email & Register User
                </Button>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setStep('request');
                      clearError();
                      setFormErrors({});
                    }}
                    className="text-xs font-semibold text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Change Details
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0}
                    className={`text-xs font-semibold transition-colors cursor-pointer ${
                      countdown > 0 
                        ? 'text-slate-300 pointer-events-none' 
                        : 'text-primary hover:text-primary-hover'
                    }`}
                  >
                    {countdown > 0 ? `Resend Code (${countdown}s)` : 'Resend Code'}
                  </button>
                </div>

                {/* Dev bypass auto fill helper */}
                <div className="flex justify-center pt-4 border-t border-slate-100 mt-4">
                  <button
                    type="button"
                    onClick={handleAutoFillOtp}
                    className="text-[11px] font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer flex items-center space-x-1"
                  >
                    <span>⚡ Auto-Fill Verification Code (Dev Bypass)</span>
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-[10px] text-slate-400 space-y-1 block">
        <p>© 2026 XelCo InfraTechnologies Pvt. Ltd. (XIT). All rights reserved.</p>
        <p className="flex justify-center items-center space-x-1">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 inline-block"></span>
          <span>Secure Access Gateway</span>
        </p>
      </div>
    </div>
  );
}
