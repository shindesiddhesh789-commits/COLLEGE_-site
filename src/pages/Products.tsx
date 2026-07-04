import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircle2, 
  MonitorSmartphone, 
  Server, 
  ShieldCheck, 
  Zap, 
  AlertTriangle, 
  TrendingDown, 
  Map, 
  Cpu, 
  Wifi, 
  BatteryCharging, 
  Sun, 
  LineChart, 
  Lock, 
  Route, 
  Database,
  Smartphone,
  ArrowRight,
  ArrowLeft,
  Settings,
  Building,
  Home,
  Building2,
  Users,
  BugOff,
  Recycle,
  CloudFog,
  Trash2
} from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const productsData = {
  commercial: {
    id: 'commercial',
    // SECTION 1: HERO
    hero: {
      name: 'Commercial Smart Bin',
      headline: 'Enterprise Smart Bins for Commercial Infrastructure',
      description: 'Intelligent waste sorting, capacity monitoring, and automated ESG reporting designed to optimize facility management and reduce operational overhead.',
      cta: 'Request a Demo',
      image: '/commercial-bin-v0.0.1.png'
    },
    // SECTION 2: PROBLEM
    problem: {
      title: 'The High Cost of Inefficiency',
      description: 'Traditional waste management in large facilities relies on blind collection schedules, leading to massive inefficiencies.',
      points: [
        'Overflowing bins causing poor hygiene and pest risks in premium spaces',
        'Manual monitoring resulting in wasted janitorial hours',
        'High operational costs due to unoptimized collection routes',
        'Lack of accurate data for ESG and sustainability reporting',
        'Cross-contamination of recyclables due to poor segregation'
      ]
    },
    // SECTION 3: SOLUTION
    solution: {
      title: 'Automated Facility Management',
      description: 'XelCo Commercial Bins eliminate the guesswork. Our intelligent hardware and software ecosystem optimizes janitorial routes, provides multi-stream segregation, and automates your corporate sustainability reporting in real-time.',
      benefits: [
        'Overflow prevention through real-time monitoring',
        'Automated route optimization for janitorial staff',
        'Multi-stream segregation at the source',
        'Instant ESG data analytics and reporting'
      ]
    },
    // SECTION 4: HOW IT WORKS
    howItWorks: [
      { step: 1, title: 'Waste Deposited', desc: 'User deposits waste into segregated compartments.' },
      { step: 2, title: 'Sensor Detects Level', desc: 'Ultrasonic sensors measure capacity in real-time.' },
      { step: 3, title: 'Data Sent to Cloud', desc: 'Secure transmission via Wi-Fi/LTE to XelCo Cloud.' },
      { step: 4, title: 'Dashboard Updates', desc: 'Facility managers see live status of all bins.' },
      { step: 5, title: 'Alert Generated', desc: 'System triggers alerts when bins reach 85% capacity.' },
      { step: 6, title: 'Optimized Pickup', desc: 'Janitorial staff routed only to bins needing service.' }
    ],
    // SECTION 5: FEATURES
    features: [
      { icon: <MonitorSmartphone />, title: 'Real-Time Capacity Visibility', desc: 'High-precision ultrasonic sensors track waste levels 24/7, eliminating blind collection routes and saving labor hours.' },
      { icon: <LineChart />, title: 'Predictive Routing Intelligence', desc: 'AI algorithms forecast capacity breaches, allowing you to optimize janitorial schedules and cut operational costs.' },
      { icon: <Database />, title: 'Centralized Infrastructure Control', desc: 'Enterprise portal provides facility-wide visibility, generating instant ESG compliance and sustainability reports.' },
      { icon: <Settings />, title: 'Maximum Uptime Reliability', desc: 'Automated health checks detect hardware issues before failure, ensuring scalable and continuous operation.' },
      { icon: <Wifi />, title: 'Uninterrupted Connectivity', desc: 'Enterprise-grade Wi-Fi with LTE-M fallback guarantees your data flows securely without interruption.' },
      { icon: <Lock />, title: 'Asset Security & Protection', desc: 'Built-in accelerometers alert management to unauthorized access, protecting your infrastructure investment.' }
    ],
    // SECTION 6: BENEFITS
    benefitsLabel: 'For Commercial Properties',
    benefits: [
      'Reduce janitorial labor costs by up to 40%',
      'Eliminate overflowing bins in premium public areas',
      'Automate data collection for corporate ESG audits',
      'Improve recycling diversion rates and reduce landfill fees'
    ],
    // SECTION 7: ARCHITECTURE
    architecture: [
      'Commercial Smart Bin',
      'Enterprise Gateway',
      'XelCo Cloud Platform',
      'ESG Analytics Engine',
      'Facility Admin Dashboard',
      'Janitorial Staff App'
    ],
    // SECTION 8: ROI
    roi: [
      { value: '-40%', label: 'Reduced Collection Cost' },
      { value: '+65%', label: 'Increased Efficiency' },
      { value: '100%', label: 'Automated ESG Data' },
      { value: '< 12mo', label: 'Payback Period' }
    ],
    // SECTION 9: CASE STUDY
    caseStudy: {
      client: 'Global Tech Park, Bangalore',
      quote: "We reduced our janitorial rounds by 40% immediately. The ESG data generated by the smartBins made our annual sustainability reporting virtually effortless. The ROI on our 5-floor deployment was achieved in just 8 months.",
      author: 'Marcus Chen, Facilities Director',
      metrics: ['45,000 USD saved annually', 'Zero overflowing bins since deployment']
    }
  },
  residential: {
    id: 'residential',
    hero: {
      name: 'Residential Smart Bin',
      headline: 'Next-Generation Smart Bins for Modern Living',
      description: 'Touchless disposal, advanced odor control, and AI-powered sorting analytics designed to enforce segregation and optimize housekeeping routes in premium communities.',
      cta: 'Request a Demo',
      image: '/home-bin-v0.0.1.png'
    },
    problem: {
      title: 'The Challenge of Residential Waste',
      description: 'Modern housing societies face significant challenges maintaining hygiene and enforcing proper waste segregation.',
      points: [
        'Lingering odors and pest issues in shared corridors',
        'Poor compliance with municipal waste segregation mandates',
        'Lack of visibility into household carbon footprints',
        'Inefficient door-to-door collection schedules causing bottlenecks'
      ]
    },
    solution: {
      title: 'Clean, Odorless, Intelligent',
      description: 'XelCo Residential Smart Bins integrate seamlessly into modern homes and luxury societies. With touchless operation, active odor neutralization, and gamified sustainability tracking via mobile app, we make responsible waste management effortless.',
      benefits: [
        '100% Touchless hygienic operation',
        'Active carbon odor neutralization',
        'Mobile app for household recycling stats',
        'Integration with Smart Home ecosystems'
      ]
    },
    howItWorks: [
      { step: 1, title: 'Proximity Detection', desc: 'Lid opens automatically as user approaches.' },
      { step: 2, title: 'Waste Deposited', desc: 'User drops waste; bin automatically segregates.' },
      { step: 3, title: 'Odor Neutralization', desc: 'Active filters eliminate organic odors instantly.' },
      { step: 4, title: 'Data Synced', desc: 'Household recycling stats sync to mobile app.' },
      { step: 5, title: 'Collection Alert', desc: 'Society management notified when block bins are full.' },
      { step: 6, title: 'Optimized Pickup', desc: 'Housekeeping routes optimized block by block.' }
    ],
    features: [
      { icon: <ShieldCheck />, title: '100% Touchless Operation', desc: 'Advanced proximity sensors ensure hygienic, hands-free usage, elevating community health standards.' },
      { icon: <Smartphone />, title: 'Automated Compliance Tracking', desc: 'Monitor household recycling habits to ensure 100% compliance with municipal segregation mandates.' },
      { icon: <Wifi />, title: 'Smart Ecosystem Integration', desc: 'Connects to property networks for OTA updates and seamless management via the central Admin Portal.' },
      { icon: <BatteryCharging />, title: 'Low-Maintenance Power', desc: 'High-capacity rechargeable lithium-ion battery lasts 6 months, minimizing facilities maintenance.' },
      { icon: <AlertTriangle />, title: 'Active Odor Neutralization', desc: 'Built-in active carbon filters block odors and keep shared corridors fresh, eliminating resident complaints.' },
      { icon: <LineChart />, title: 'Actionable Waste Analytics', desc: 'Insights into waste generation patterns to optimize block-by-block housekeeping deployment.' }
    ],
    benefitsLabel: 'For Residential Communities',
    benefits: [
      'Maintain premium hygiene standards in corridors and homes',
      'Ensure 100% compliance with segregation mandates easily',
      'Gamify recycling to encourage responsible habits for children',
      'Optimize society housekeeping staff deployment'
    ],
    architecture: [
      'Residential Smart Bin',
      'Home Wi-Fi Network',
      'XelCo Consumer Cloud',
      'Gamification Engine',
      'Resident Mobile App',
      'Society Admin Portal'
    ],
    roi: [
      { value: '100%', label: 'Touchless Hygiene' },
      { value: '60%', label: 'Increase in Recycling' },
      { value: 'Zero', label: 'Odor Complaints' },
      { value: 'Smart', label: 'Home Integrated' }
    ],
    caseStudy: {
      client: 'Prestige Lakeside Habitat',
      quote: "It completely changed how our community recycles. Kids actually want to use the smartBin to see their stats go up on the app. The odor control in closed apartments is remarkable.",
      author: 'Sarah Jenkins, RWA President',
      metrics: ['60% reduction in plastic waste', '100% segregation compliance']
    }
  },
  municipal: {
    id: 'municipal',
    hero: {
      name: 'Municipal Smart Bin',
      headline: 'Civic Infrastructure for Smart Cities',
      description: 'Rugged, solar-powered compaction bins that eliminate overflows, optimize fleet routes, and drastically cut operational costs for metropolitan sanitation.',
      cta: 'Request a Pilot Deployment',
      image: '/municipal-bin-v0.0.1.png'
    },
    problem: {
      title: 'The Burden on Urban Sanitation',
      description: 'Rapid urbanization is breaking traditional municipal waste collection systems, draining civic budgets and worsening pollution.',
      points: [
        'Unoptimized, static collection routes wasting fuel and time',
        'Public bins overflowing before scheduled pickups, causing civic blight',
        'High operational costs dominating municipal budgets',
        'Significant carbon emissions from heavy sanitation fleets',
        'Vandalism and damage to standard public infrastructure'
      ]
    },
    solution: {
      title: 'Data-Driven Urban Sanitation',
      description: 'XelCo Municipal Smart Bins transform static bins into active IoT nodes. With built-in solar compaction increasing capacity by 5x, and AI dynamic routing directing trucks only where needed, cities can drastically cut costs while improving public cleanliness.',
      benefits: [
        '5x Waste compaction via solar power',
        'Dynamic AI route optimization for fleets',
        'Vandal-proof, ruggedized civic hardware',
        'Real-time civic data dashboard for city planners'
      ]
    },
    howItWorks: [
      { step: 1, title: 'Waste Deposited', desc: 'Citizens deposit waste in public areas.' },
      { step: 2, title: 'Solar Compaction', desc: 'Internal ram compacts waste, increasing capacity 5x.' },
      { step: 3, title: 'Data Sent to Cloud', desc: 'LoRa/GSM transmits fill levels to municipal servers.' },
      { step: 4, title: 'Fleet Routing', desc: 'AI calculates optimal collection route for the day.' },
      { step: 5, title: 'Driver Dispatched', desc: 'Sanitation trucks navigate via XelCo Driver App.' },
      { step: 6, title: 'Targeted Pickup', desc: 'Only full bins are serviced, saving massive time.' }
    ],
    features: [
      { icon: <Building />, title: 'Eliminate Civic Blight', desc: 'By preventing overflows, we restore public hygiene and eliminate complaints, improving overall city perception.' },
      { icon: <Users />, title: 'Community Engagement', desc: 'Customizable graphic wraps and digital message panels transform bins into active public communication nodes.' },
      { icon: <TrendingDown />, title: 'Cut Collections by 80%', desc: 'Real-time telemetry combined with 5x solar compaction means trucks only roll when bins are actually full.' },
      { icon: <BugOff />, title: 'Eradicate Pest Food Sources', desc: 'Fully enclosed, tamper-proof designs cut off urban pest food supplies, improving public health metrics.' },
      { icon: <Recycle />, title: 'Actionable Sustainability Data', desc: 'Achieve zero-waste goals with granular, block-level data on public recycling participation.' },
      { icon: <CloudFog />, title: 'Slash Fleet Emissions', desc: 'Dynamic AI routing reduces unnecessary truck mileage, cutting fuel consumption and fleet emissions by up to 70%.' }
    ],
    benefitsLabel: 'For Municipal Corporations',
    benefits: [
      'Reduce sanitation fleet fuel usage and carbon emissions',
      'Eliminate civic complaints regarding overflowing public bins',
      'Cut total waste management operational costs by up to 50%',
      'Make data-driven urban planning decisions based on real usage'
    ],
    architecture: [
      'Solar Compactor Bin',
      'Cellular/LoRa Network',
      'Municipal Secure Cloud',
      'AI Routing Engine',
      'City Command Center',
      'Sanitation Fleet App'
    ],
    roi: [
      { value: '5x', label: 'Increased Capacity' },
      { value: '-50%', label: 'Reduced Truck Rolls' },
      { value: '-45%', label: 'Fuel Usage Cut' },
      { value: 'Zero', label: 'Overflow Complaints' }
    ],
    caseStudy: {
      client: 'Dept of Public Works, Metro City',
      quote: "Deploying XelCo across downtown reduced overflowing bins to zero, significantly improving public perception. The reduction in truck rolls alone paid for the entire system within two budget cycles.",
      author: 'City Commissioner',
      metrics: ['Paid for itself in 24 months', '70% reduction in fuel costs']
    }
  }
};

type TabKey = keyof typeof productsData;

export default function Products() {
  const { productId } = useParams<{ productId?: string }>();
  const navigate = useNavigate();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  if (productId) {
    const validTabs = ['commercial', 'residential', 'municipal'];
    if (!validTabs.includes(productId)) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center font-display text-2xl text-dark-secondary gap-4 pt-24">
          <p>Product Not Found</p>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      );
    }
    const activeTab = productId as TabKey;
    const activeData = productsData[activeTab];

    return (
      <div className="pt-24 bg-white">
        {/* Back navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <button 
            onClick={() => navigate('/products')}
            className="flex items-center text-sm font-semibold text-primary hover:text-primary-hover transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to All Products
          </button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={productId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
          {/* Section 1: Hero */}
          <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
              <div>
                <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">
                  {activeData.hero.name}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
                  {activeData.hero.headline}
                </h1>
                <p className="text-xl text-dark-secondary mb-8 leading-relaxed">
                  {activeData.hero.description}
                </p>
                <Button size="lg" onClick={() => setIsQuoteModalOpen(true)} className="px-8 rounded-xl shadow-lg shadow-primary/20">
                  {activeData.hero.cta}
                </Button>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/3] lg:aspect-auto lg:h-[600px] border border-border">
                <img src={activeData.hero.image} alt={activeData.hero.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-tr from-dark/40 to-transparent"></div>
              </div>
            </div>
          </section>

          {/* Section 2 & 3: Problem + Solution */}
          <section className="py-24 bg-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* LEFT: The Problem Card */}
                <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg min-h-[600px]">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img 
                      src={activeTab === 'municipal' 
                        ? "https://images.unsplash.com/photo-1605600659908-0ef719419d41?q=80&w=2536&auto=format&fit=crop"
                        : activeTab === 'residential'
                          ? "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2565&auto=format&fit=crop"
                          : "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2569&auto=format&fit=crop"
                      } 
                      alt="The Problem" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
                  </div>
                  {/* Content */}
                  <div className="relative z-10 p-10 flex flex-col h-full">
                    <span className="text-red-500 font-bold tracking-wider uppercase text-sm mb-3 block">The Problem & Impact</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight uppercase">{activeData.problem.title}</h2>
                    <p className="text-dark-secondary leading-relaxed mb-8">
                      {activeData.problem.description}
                    </p>
                    <div className="space-y-5 flex-grow">
                      {activeData.problem.points.map((point, idx) => (
                        <div key={idx} className="flex items-start">
                          <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 mr-3 shrink-0" />
                          <span className="text-[15px] font-medium text-dark">{point}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* RIGHT: Our Solution Card */}
                <div className="relative rounded-3xl overflow-hidden border border-border shadow-lg min-h-[600px]">
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <img 
                      src={activeData.hero.image} 
                      alt="XelCo Smart Bin Solution" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-white/85 backdrop-blur-sm"></div>
                  </div>
                  {/* Content */}
                  <div className="relative z-10 p-10 flex flex-col h-full">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Our Solution</span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 leading-tight uppercase">{activeData.solution.title}</h2>
                    <p className="text-dark-secondary leading-relaxed mb-8">
                      {activeData.solution.description}
                    </p>
                    <div className="space-y-5 flex-grow">
                      {activeData.solution.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 mr-3 shrink-0" />
                          <span className="text-[15px] font-medium text-dark">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* Section 4: How It Works */}
          <section className="py-24 bg-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                {activeData.howItWorks.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold mb-6 border border-white/20 group-hover:bg-primary group-hover:border-primary transition-colors">
                      {step.step}
                    </div>
                    {idx < activeData.howItWorks.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-16 right-0 h-0.5 bg-white/20"></div>
                    )}
                    <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 5: Features */}
          <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Operational Benefits</h2>
              <p className="text-xl text-dark-secondary">Purpose-built technology delivering measurable operational outcomes.</p>
            </div>
            
            {activeTab === 'municipal' ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                {activeData.features.map((feature, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="w-20 h-20 text-accent-blue flex items-center justify-center mb-6">
                      {React.cloneElement(feature.icon as React.ReactElement<any>, { className: "w-16 h-16" })}
                    </div>
                    <h3 className="text-lg font-bold text-accent-blue mb-4 leading-tight">{feature.title}</h3>
                    <p className="text-sm text-dark-secondary leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {activeData.features.map((feature, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-border hover:shadow-md transition-shadow">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-dark-secondary leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Section 6 & 7: Benefits & Architecture / Tech Specs + Stories */}
          {activeTab === 'municipal' ? (
            <section className="py-24 bg-light border-y border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* LEFT: Technical Specifications */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Technical Specifications</h2>
                    
                    {/* Spec Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Trash2 className="w-6 h-6 text-primary" />
                          <div className="w-16 h-2 bg-primary/30 rounded-full"></div>
                          <div className="w-10 h-2 bg-primary/50 rounded-full"></div>
                        </div>
                        <p className="text-sm font-bold text-dark">Capacity: <span className="font-medium text-dark-secondary">Scalable Public to Subterranean</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Sun className="w-6 h-6 text-primary" />
                          <BatteryCharging className="w-5 h-5 text-primary/60" />
                          <Zap className="w-5 h-5 text-primary/40" />
                        </div>
                        <p className="text-sm font-bold text-dark">Power: <span className="font-medium text-dark-secondary">Off-grid, Solar-Powered</span></p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Map className="w-5 h-5 text-primary" />
                          <span className="text-xs font-bold text-primary/70">5G</span>
                          <span className="text-xs font-bold text-primary/50">LoRaWAN</span>
                          <Wifi className="w-5 h-5 text-primary/60" />
                        </div>
                        <p className="text-sm font-bold text-dark">Connectivity: <span className="font-medium text-dark-secondary">Multi-Protocol Compatible</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldCheck className="w-6 h-6 text-primary" />
                          <CheckCircle2 className="w-5 h-5 text-primary/50" />
                        </div>
                        <p className="text-sm font-bold text-dark">Materials: <span className="font-medium text-dark-secondary">Graffiti-resistant Steel, IK10 Rated</span></p>
                      </div>
                    </div>

                    {/* Integration & Compatibility */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                      <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Integration & Compatibility</h3>
                      <p className="text-sm text-dark-secondary mb-5">Our open API architecture allows seamless data flow into your existing software ecosystems.</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <span className="text-dark font-bold text-lg">&lt;/&gt;</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <Server className="w-6 h-6 text-dark" />
                        </div>
                        <div className="flex items-center justify-center px-3 h-12 bg-dark/5 rounded-xl">
                          <span className="text-dark font-bold text-sm">AWS</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <Database className="w-6 h-6 text-dark" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Success Stories */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Success Stories</h2>
                    
                    {/* Story 1 */}
                    <div className="bg-dark rounded-2xl p-8 mb-6 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xl">
                          D
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "Deploying XelCo across downtown reduced overflowing bins to zero, <strong>significantly improving public perception.</strong>" 🏛️
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">D</span>
                            <span className="text-sm font-medium text-gray-300">Dept of Public Works, Metro City</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">City Perception Transformation</span>
                      </div>
                    </div>

                    {/* Story 2 */}
                    <div className="bg-dark rounded-2xl p-8 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary font-bold text-xl">
                          C
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "The reduction in truck rolls alone paid for the <strong>system within two budget cycles.</strong>" 💰
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center text-[10px] font-bold text-secondary">C</span>
                            <span className="text-sm font-medium text-gray-300">City Manager's Office</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Economic Model Validated</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          ) : activeTab === 'commercial' ? (
            <section className="py-24 bg-light border-y border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* LEFT: Technical Specifications */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Technical Specifications</h2>
                    
                    {/* Spec Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Trash2 className="w-6 h-6 text-primary" />
                          <div className="w-16 h-2 bg-primary/30 rounded-full"></div>
                          <div className="w-10 h-2 bg-primary/50 rounded-full"></div>
                        </div>
                        <p className="text-sm font-bold text-dark">Capacity: <span className="font-medium text-dark-secondary">Multi-stream, 45L / 60L per compartment</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <BatteryCharging className="w-6 h-6 text-primary" />
                          <Zap className="w-5 h-5 text-primary/60" />
                        </div>
                        <p className="text-sm font-bold text-dark">Power: <span className="font-medium text-dark-secondary">Rechargeable Li-ion, 6 months per charge</span></p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Wifi className="w-5 h-5 text-primary" />
                          <span className="text-xs font-bold text-primary/70">Wi-Fi</span>
                          <span className="text-xs font-bold text-primary/50">BLE</span>
                        </div>
                        <p className="text-sm font-bold text-dark">Connectivity: <span className="font-medium text-dark-secondary">Wi-Fi 2.4GHz / Bluetooth LE</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldCheck className="w-6 h-6 text-primary" />
                          <CheckCircle2 className="w-5 h-5 text-primary/50" />
                        </div>
                        <p className="text-sm font-bold text-dark">Materials: <span className="font-medium text-dark-secondary">Fingerprint-resistant stainless steel & recycled ABS</span></p>
                      </div>
                    </div>

                    {/* Integration & Compatibility */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                      <h3 className="text-lg font-bold uppercase tracking-tight mb-2">Integration & Compatibility</h3>
                      <p className="text-sm text-dark-secondary mb-5">Our open API architecture allows seamless data flow into your existing software ecosystems.</p>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <span className="text-dark font-bold text-lg">&lt;/&gt;</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <Server className="w-6 h-6 text-dark" />
                        </div>
                        <div className="flex items-center justify-center px-3 h-12 bg-dark/5 rounded-xl">
                          <span className="text-dark font-bold text-sm">AWS</span>
                        </div>
                        <div className="flex items-center justify-center w-12 h-12 bg-dark/5 rounded-xl">
                          <Database className="w-6 h-6 text-dark" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Success Stories */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Success Stories</h2>
                    
                    {/* Story 1 */}
                    <div className="bg-dark rounded-2xl p-8 mb-6 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xl">
                          M
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "We reduced our janitorial rounds by 40% immediately. The ESG data generated by the smartBins made our annual <strong>sustainability reporting virtually effortless.</strong>" 🏢
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">M</span>
                            <span className="text-sm font-medium text-gray-300">Marcus Chen, Facilities Director</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Operational Efficiency Transformation</span>
                      </div>
                    </div>

                    {/* Story 2 */}
                    <div className="bg-dark rounded-2xl p-8 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary font-bold text-xl">
                          V
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "The automated ESG reporting from the commercial smart bins made our annual <strong>sustainability audits virtually effortless.</strong>" 💰
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center text-[10px] font-bold text-secondary">V</span>
                            <span className="text-sm font-medium text-gray-300">VP of Facilities, Global Tech Park</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">ESG Compliance Automated</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          ) : (
            <section className="py-24 bg-light border-y border-border">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                  {/* LEFT: Technical Specifications */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Technical Specifications</h2>
                    
                    {/* Spec Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Trash2 className="w-6 h-6 text-primary" />
                          <div className="w-16 h-2 bg-primary/30 rounded-full"></div>
                          <div className="w-10 h-2 bg-primary/50 rounded-full"></div>
                        </div>
                        <p className="text-sm font-bold text-dark">Capacity: <span className="font-medium text-dark-secondary">Modular 120L / 240L / 360L stations</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <BatteryCharging className="w-6 h-6 text-primary" />
                          <Zap className="w-5 h-5 text-primary/60" />
                        </div>
                        <p className="text-sm font-bold text-dark">Power: <span className="font-medium text-dark-secondary">Mains AC or high-capacity battery packs</span></p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <Wifi className="w-5 h-5 text-primary" />
                          <span className="text-xs font-bold text-primary/70">Wi-Fi</span>
                          <span className="text-xs font-bold text-primary/50">BLE</span>
                        </div>
                        <p className="text-sm font-bold text-dark">Connectivity: <span className="font-medium text-dark-secondary">Wi-Fi, LTE-M fallback, API integrations</span></p>
                      </div>
                      <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <ShieldCheck className="w-6 h-6 text-primary" />
                          <CheckCircle2 className="w-5 h-5 text-primary/50" />
                        </div>
                        <p className="text-sm font-bold text-dark">Materials: <span className="font-medium text-dark-secondary">Heavy-duty steel & antimicrobial coatings</span></p>
                      </div>
                    </div>

                    {/* Integration & Compatibility */}
                    <div className="bg-white rounded-2xl p-6 border border-border shadow-sm">
                      <div className="flex items-center gap-3 mb-2">
                        <Settings className="w-5 h-5 text-dark" />
                        <h3 className="text-lg font-bold">Integration & Compatibility</h3>
                      </div>
                      <p className="text-sm text-dark-secondary mb-5">Our open API architecture allows seamless data flow into your existing software ecosystems.</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-4 py-2 bg-light border border-border rounded-lg text-sm font-medium text-dark">REST API</span>
                        <span className="px-4 py-2 bg-light border border-border rounded-lg text-sm font-medium text-dark">Webhooks</span>
                        <span className="px-4 py-2 bg-light border border-border rounded-lg text-sm font-medium text-dark">AWS IoT</span>
                        <span className="px-4 py-2 bg-light border border-border rounded-lg text-sm font-medium text-dark">Azure Service Bus</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT: Success Stories */}
                  <div>
                    <h2 className="text-3xl font-bold mb-8 uppercase tracking-tight">Success Stories</h2>
                    
                    {/* Story 1 */}
                    <div className="bg-dark rounded-2xl p-8 mb-6 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-primary font-bold text-xl">
                          S
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "It completely changed how my family recycles. My kids actually want to use the smartBin to see their stats go up." 🏡
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-[10px] font-bold text-primary">S</span>
                            <span className="text-sm font-medium text-gray-300">Sarah Jenkins, Homeowner</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Gamified Recycling Success</span>
                      </div>
                    </div>

                    {/* Story 2 */}
                    <div className="bg-dark rounded-2xl p-8 text-white">
                      <div className="flex items-start gap-5">
                        <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 text-secondary font-bold text-xl">
                          D
                        </div>
                        <div>
                          <p className="text-[15px] leading-relaxed mb-4">
                            "The odor control is remarkable. Perfect for modern open-concept living spaces and luxury residential corridors." ✨
                          </p>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-5 h-5 rounded-full bg-secondary/30 flex items-center justify-center text-[10px] font-bold text-secondary">D</span>
                            <span className="text-sm font-medium text-gray-300">David T., Architect</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10">
                        <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Premium Design Validation</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          )}


          {/* Section 9: Case Study */}
          <section className="py-24 bg-dark text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Case Study</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-8">{activeData.caseStudy.client}</h2>
                  <p className="text-xl md:text-2xl leading-relaxed font-light italic mb-8">
                    "{activeData.caseStudy.quote}"
                  </p>
                  <div className="flex items-center mb-12">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4">
                      <span className="text-primary font-bold text-xl">{activeData.caseStudy.author.charAt(0)}</span>
                    </div>
                    <span className="text-gray-300 font-medium">{activeData.caseStudy.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    {activeData.caseStudy.metrics.map((m, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold border border-white/20">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl overflow-hidden aspect-video relative border border-white/10">
                  {/* Case study placeholder image */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-dark flex items-center justify-center">
                    <img src={activeData.hero.image} alt="Case Study" className="w-full h-full object-cover mix-blend-overlay opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="outline" className="border-white text-dark bg-white hover:bg-white/90">
                        Read Full Case Study
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 10: Contact CTA */}
          <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready for Intelligent Infrastructure?</h2>
            <p className="text-xl text-dark-secondary mb-10">
              Transform your waste management operations today. Our {activeData.hero.name.toLowerCase()} experts are ready to build your custom deployment plan.
            </p>
            <Button size="lg" onClick={() => setIsQuoteModalOpen(true)} className="px-10 py-6 text-lg rounded-2xl shadow-xl shadow-primary/20">
              {activeData.hero.cta} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </section>

          </motion.div>
        </AnimatePresence>

        <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} segment={activeTab} />
      </div>
    );
  }

  // If no productId in the URL, render the Product Index Page (the 3 cards)
  return (
    <div className="pt-24 bg-white min-h-[70vh] flex flex-col justify-center">
      {/* Visual Product Selector */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Choose Your Infrastructure</h1>
            <p className="text-lg text-dark-secondary">Select a smart bin solution below to view detailed specifications.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Commercial Bin Card */}
            <div 
              onClick={() => navigate('/products/commercial')}
              className="flex flex-col border-2 rounded-2xl overflow-hidden transition-all duration-300 border-border hover:border-accent-teal hover:shadow-xl hover:shadow-accent-teal/10 hover:scale-103 cursor-pointer bg-white"
            >
              <div className="bg-accent-teal p-6 text-white text-center">
                <Building className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold">Commercial</h3>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow text-dark-secondary font-medium">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-teal mr-2 shrink-0" /> Multi-stream segregation</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-teal mr-2 shrink-0" /> Real-time fill monitoring</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-teal mr-2 shrink-0" /> Corporate ESG reporting</li>
                </ul>
                <Button 
                  onClick={(e) => { e.stopPropagation(); navigate('/products/commercial'); }}
                  className="w-full py-6 text-lg bg-accent-teal hover:bg-accent-teal/90 text-white font-semibold rounded-xl"
                >
                  View Product
                </Button>
              </div>
            </div>

            {/* Residential Bin Card */}
            <div 
              onClick={() => navigate('/products/residential')}
              className="flex flex-col border-2 rounded-2xl overflow-hidden transition-all duration-300 border-border hover:border-accent-blue hover:shadow-xl hover:shadow-accent-blue/10 hover:scale-103 cursor-pointer bg-white"
            >
              <div className="bg-accent-blue p-6 text-white text-center">
                <Home className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold">Residential</h3>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow text-dark-secondary font-medium">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-blue mr-2 shrink-0" /> 100% Touchless operation</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-blue mr-2 shrink-0" /> Active odor neutralization</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-accent-blue mr-2 shrink-0" /> Mobile app tracking</li>
                </ul>
                <Button 
                  onClick={(e) => { e.stopPropagation(); navigate('/products/residential'); }}
                  className="w-full py-6 text-lg bg-accent-blue hover:bg-accent-blue/90 text-white font-semibold rounded-xl"
                >
                  View Product
                </Button>
              </div>
            </div>

            {/* Municipal Bin Card */}
            <div 
              onClick={() => navigate('/products/municipal')}
              className="flex flex-col border-2 rounded-2xl overflow-hidden transition-all duration-300 border-border hover:border-primary hover:shadow-xl hover:shadow-primary/10 hover:scale-103 cursor-pointer bg-white"
            >
              <div className="bg-primary p-6 text-white text-center">
                <Building2 className="w-10 h-10 mx-auto mb-3 opacity-90" />
                <h3 className="text-xl font-bold">Municipal</h3>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <ul className="space-y-3 mb-8 flex-grow text-dark-secondary font-medium">
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-2 shrink-0" /> Solar powered compactor</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-2 shrink-0" /> 5x waste capacity</li>
                  <li className="flex items-start"><CheckCircle2 className="w-5 h-5 text-primary mr-2 shrink-0" /> Rugged & vandal-proof</li>
                </ul>
                <Button 
                  onClick={(e) => { e.stopPropagation(); navigate('/products/municipal'); }}
                  className="w-full py-6 text-lg bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl"
                >
                  View Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function QuoteModal({ isOpen, onClose, segment }: { isOpen: boolean; onClose: () => void; segment: string }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const segmentName = segment === 'commercial' ? 'Commercial' : segment === 'residential' ? 'Residential' : 'Municipal';

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={submitted ? "Request Received" : segment === 'municipal' ? "Request a Pilot Deployment" : "Request a Demo"}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <p className="text-lg text-dark-secondary">Thank you! Our {segmentName} infrastructure team will reach out shortly with technical specifications and pricing.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-dark-secondary text-sm mb-6">Fill out this quick form to receive detailed technical specifications, compliance documents, and tailored pricing.</p>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" required />
            <Input label="Last Name" required />
          </div>
          <Input label="Official Email Address" type="email" required />
          {segment !== 'residential' && (
            <Input label="Organization / Municipality" required />
          )}
          <Input label="Phone Number" type="tel" />
          <Textarea label="Deployment Scope" placeholder="E.g., Number of bins required, specific locations, timeline..." />
          <div className="pt-4 flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
