import React from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { 
  ArrowRight, CheckCircle2, Cloud, Wifi, MapPin, Trash2, Building2, TrendingUp, TrendingDown,
  Map, Activity, Clock, ShieldCheck, Zap, Server, Leaf, Plane, Train, Briefcase, 
  Stethoscope, Building, Users, Home as HomeIcon, Settings, Truck, AlertTriangle, XCircle, 
  Database, BarChart3, LineChart, Recycle, Search, Bell, ChevronDown, FileText
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col overflow-hidden">
      {/* --- HERO SECTION --- */}
      <section className="relative pt-12 md:pt-20 pb-24 overflow-hidden bg-white">
        
        {/* Absolute right-side background visual on desktop */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] hidden lg:block pointer-events-none z-0">
          <img 
            src="/hero-image.png" 
            alt="XelCo Intelligent Waste Management Network" 
            className="w-full h-full object-contain object-right" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-green-50 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6 border border-green-100">
                ENTERPRISE INFRASTRUCTURE
              </span>
              <h1 className="text-5xl lg:text-[4.5rem] leading-[1.1] font-bold text-dark mb-6 tracking-tight font-display">
                Waste Management<br />
                <span className="text-primary">Modernization</span><br />
                for Smart Cities.
              </h1>
              <p className="text-lg text-dark-secondary mb-8 leading-relaxed max-w-2xl">
                XelCo delivers enterprise-grade smart bins and AI routing platforms designed to optimize operational efficiency, cut fleet fuel consumption, and provide real-time infrastructure intelligence.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <Button onClick={() => navigate('/products')} className="rounded-xl px-8 py-6 text-base font-semibold shadow-lg shadow-primary/10">
                  Request a Demo
                </Button>
                <Button variant="outline" onClick={() => navigate('/contact')} className="rounded-xl px-8 py-6 text-base font-semibold border border-gray-300 bg-white hover:bg-gray-50 text-dark">
                  Talk to Our Experts
                </Button>
              </div>

              {/* Hero Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200">
                <div className="flex items-center gap-3">
                  <Trash2 className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-2xl font-extrabold text-primary leading-none">2,500+</div>
                    <p className="text-[10px] text-dark-secondary font-bold leading-tight mt-1">Smart Bins<br/>Deployed</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-2xl font-extrabold text-primary leading-none">100+</div>
                    <p className="text-[10px] text-dark-secondary font-bold leading-tight mt-1">Cities &<br/>Organizations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-2xl font-extrabold text-primary leading-none">1.2M+</div>
                    <p className="text-[10px] text-dark-secondary font-bold leading-tight mt-1">Kg Waste Managed<br/>Daily</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-primary shrink-0" />
                  <div>
                    <div className="text-2xl font-extrabold text-primary leading-none">40%+</div>
                    <p className="text-[10px] text-dark-secondary font-bold leading-tight mt-1">Operational<br/>Efficiency</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop spacer for background graphics */}
            <div className="lg:col-span-5 h-20 lg:block hidden pointer-events-none"></div>

            {/* Mobile/Tablet inline visuals */}
            <div className="lg:col-span-5 relative w-full flex items-center justify-center lg:hidden block mt-6">
              <img 
                src="/hero-image.png" 
                alt="XelCo Intelligent Waste Management Network" 
                className="w-full h-auto max-h-[400px] object-contain" 
              />
            </div>
          </div>
        </div>
      </section>



      {/* --- QUICK FEATURES ROW --- */}
      <section className="pb-16 bg-[#FAFBFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Feature 1 */}
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shrink-0">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-dark mb-1">Real-time Monitoring</h4>
                <p className="text-[11px] text-dark-secondary leading-relaxed">Live fill-level monitoring and instant alerts</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shrink-0">
                <Map className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-dark mb-1">AI Route Optimization</h4>
                <p className="text-[11px] text-dark-secondary leading-relaxed">Intelligent routing for faster and efficient collections</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shrink-0">
                <TrendingDown className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-dark mb-1">Cost Efficiency</h4>
                <p className="text-[11px] text-dark-secondary leading-relaxed">Reduce operational costs and improve resource utilization</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shrink-0">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-dark mb-1">Data-Driven Decisions</h4>
                <p className="text-[11px] text-dark-secondary leading-relaxed">Analytics and insights for smarter decision making</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="flex items-start gap-3 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-green-50 text-primary flex items-center justify-center shrink-0">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-dark mb-1">Sustainability Impact</h4>
                <p className="text-[11px] text-dark-secondary leading-relaxed">Towards cleaner cities and a greener tomorrow</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROBLEM SECTION --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#1C2024] rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
              <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-black/50 to-transparent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-12 max-w-2xl leading-tight relative z-10 text-white">
              Traditional Waste Collection is<br/>Costly, Reactive, and Inefficient
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 relative z-10">
              {/* Cards */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Trash2 className="w-8 h-8 text-red-400 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Overflowing Bins</h4>
                <p className="text-xs text-white/70 leading-relaxed">Unhygienic and affects public health</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Zap className="w-8 h-8 text-orange-400 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Fuel Wastage</h4>
                <p className="text-xs text-white/70 leading-relaxed">Unoptimized routes increase costs</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Users className="w-8 h-8 text-blue-400 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Manual Monitoring</h4>
                <p className="text-xs text-white/70 leading-relaxed">No real-time visibility or insights</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Activity className="w-8 h-8 text-yellow-400 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Poor Visibility</h4>
                <p className="text-xs text-white/70 leading-relaxed">Hard to track assets and team performance</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <AlertTriangle className="w-8 h-8 text-orange-500 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Citizen Complaints</h4>
                <p className="text-xs text-white/70 leading-relaxed">Negative impact on satisfaction</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <Map className="w-8 h-8 text-teal-400 mb-4" />
                <h4 className="font-bold text-sm mb-2 text-white">Unoptimized Routes</h4>
                <p className="text-xs text-white/70 leading-relaxed">More time, more vehicles, more cost.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SOLUTION (LINEAR FLOW) SECTION --- */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16 bg-green-50/50 rounded-[3rem] p-12 border border-green-100">
            {/* Left Content */}
            <div className="lg:w-1/3">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                OUR SOLUTION
              </span>
              <h2 className="text-3xl font-bold mb-4 leading-tight text-dark">
                One Intelligent Platform.<br/>
                <span className="text-primary">Complete Waste Visibility.</span>
              </h2>
              <p className="text-dark-secondary mb-8">
                From smartBins to cloud analytics, XelCo provides end-to-end automation and intelligence.
              </p>
              <Button onClick={() => navigate('/products')} className="rounded-full px-6 py-5 shadow-lg shadow-primary/20">
                Explore Our Platform <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Right Flow Diagram */}
            <div className="lg:w-2/3 w-full flex justify-between items-center relative py-10 overflow-x-auto hide-scrollbar">
              {/* Connecting Dashed Line */}
              <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gray-200 border-t-2 border-dashed border-gray-300 -translate-y-1/2 z-0"></div>
              
              {/* Step 1 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-2 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary">
                  <Trash2 className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-dark whitespace-nowrap">Smart Bins</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 z-10" />
              
              {/* Step 2 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-2 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-dark">
                  <Wifi className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-dark whitespace-nowrap">IoT Gateway</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 z-10" />

              {/* Step 3 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-2 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center">
                  <Cloud className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-dark whitespace-nowrap">Cloud Platform</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 z-10" />

              {/* Step 4 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-2 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-primary">
                  <LineChart className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-dark whitespace-nowrap">Analytics Engine</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-300 z-10" />

              {/* Step 5 */}
              <div className="relative z-10 flex flex-col items-center gap-3 px-2 bg-transparent">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-dark">
                  <Truck className="w-8 h-8" />
                </div>
                <span className="font-bold text-sm text-dark whitespace-nowrap">Collection Team</span>
              </div>

            </div>
          </div>
        </div>
      </section>



      {/* --- CENTRALIZED CONTROL SECTION --- */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-5">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full mb-6">
                CENTRALIZED CONTROL
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                Manage Every Bin from One Command Center
              </h2>
              <p className="text-lg text-dark-secondary mb-10">
                Real-time data, actionable insights, and automation help you make smarter decisions and achieve operational excellence.
              </p>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Activity className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Live Monitoring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><BarChart3 className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Analytics & Reports</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Map className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Route Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><MapPin className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Asset Tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><AlertTriangle className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Predictive Alerts</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center"><Users className="w-4 h-4 text-primary"/></div>
                  <span className="font-bold text-sm text-dark">Team Management</span>
                </div>
              </div>
            </div>

            {/* Right Dashboard Mockup (Tailwind CSS replica) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl overflow-hidden flex flex-col">
                {/* Dashboard Top Bar */}
                <div className="h-14 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">
                      <svg width="22" height="22" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 10L30 30M30 10L10 30" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
                        <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="4" />
                      </svg>
                    </span>
                    <span className="font-bold text-dark tracking-tight text-[15px]">XelCo</span>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100 border border-gray-200/60 rounded-full text-[10px] text-gray-400 w-44 shrink-0">
                    <Search className="w-3 h-3 text-gray-400" />
                    <span className="truncate">Total Smart Bins Network</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-gray-400 hover:text-gray-600 relative p-0.5">
                      <Bell className="w-4 h-4" />
                      <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                    </button>
                    <div className="flex items-center gap-2 border-l border-gray-150 pl-3">
                      <img 
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80" 
                        alt="Admin" 
                        className="w-6 h-6 rounded-full object-cover border border-gray-200" 
                      />
                      <span className="text-[11px] font-semibold text-dark">Admin</span>
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="flex h-[470px]">
                  {/* Dashboard Sidebar */}
                  <div className="w-44 border-r border-gray-100 bg-white p-3 flex flex-col gap-1.5 shrink-0">
                    <div className="relative flex items-center gap-2.5 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold border-l-4 border-primary">
                      <Activity className="w-3.5 h-3.5"/> 
                      <span>Dashboard</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <Trash2 className="w-3.5 h-3.5"/> 
                      <span>Bins</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <Truck className="w-3.5 h-3.5"/> 
                      <span>Collections</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <Map className="w-3.5 h-3.5"/> 
                      <span>Routes</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <AlertTriangle className="w-3.5 h-3.5"/> 
                      <span>Alerts</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <BarChart3 className="w-3.5 h-3.5"/> 
                      <span>Analytics</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <FileText className="w-3.5 h-3.5"/> 
                      <span>Reports</span>
                    </div>
                    <div className="flex items-center gap-2.5 px-3 py-1.5 text-gray-500 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-colors">
                      <Settings className="w-3.5 h-3.5"/> 
                      <span>Settings</span>
                    </div>
                  </div>

                  {/* Dashboard Main Content */}
                  <div className="flex-1 p-5 bg-gray-50/50 overflow-hidden flex flex-col">
                    <h3 className="font-bold text-dark text-sm mb-3">Dashboard Overview</h3>
                    
                    {/* Top Stats */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 mb-1">Total Bins</div>
                          <div className="text-lg font-bold text-dark leading-tight">2,568</div>
                        </div>
                        <div className="w-6 h-[2.5px] bg-primary/70 rounded-full mt-2"></div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 mb-1">Fill Level (Avg)</div>
                          <div className="text-lg font-bold text-dark leading-tight">68%</div>
                        </div>
                        <div className="w-6 h-[2.5px] bg-primary/70 rounded-full mt-2"></div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 mb-1">Collections Today</div>
                          <div className="text-lg font-bold text-dark leading-tight">156</div>
                        </div>
                        <div className="w-6 h-[2.5px] bg-primary/70 rounded-full mt-2"></div>
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="text-[9px] font-bold text-gray-400 mb-1">Efficiency</div>
                          <div className="text-lg font-bold text-dark leading-tight">92%</div>
                        </div>
                        <div className="w-6 h-[2.5px] bg-primary/70 rounded-full mt-2"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-3 flex-1 min-h-0">
                      {/* Donut Chart Mockup */}
                      <div className="bg-white p-3.5 rounded-xl border border-gray-100 col-span-5 shadow-sm flex flex-col">
                        <div className="text-[10px] font-bold text-dark mb-3">Fill Level Distribution</div>
                        <div className="flex-1 flex items-center justify-between gap-2">
                          <div className="relative flex items-center justify-center shrink-0">
                            <div className="w-20 h-20 rounded-full border-[10px] border-t-red-500 border-r-yellow-500 border-b-green-500 border-l-blue-500 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 text-[9px] font-bold text-gray-400 flex-1 pl-1">
                            <div className="flex items-center justify-between border-b border-gray-50 pb-1">
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0"></span>
                                <span className="text-gray-600">Full</span>
                              </div>
                              <span className="text-dark">15%</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-gray-50 pb-1">
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 shrink-0"></span>
                                <span className="text-gray-600">Medium</span>
                              </div>
                              <span className="text-dark">35%</span>
                            </div>
                            <div className="flex items-center justify-between pb-1">
                              <div className="flex items-center gap-1">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary shrink-0"></span>
                                <span className="text-gray-600">Low</span>
                              </div>
                              <span className="text-dark">50%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Map/Routes Mockup */}
                      <div className="bg-white p-3.5 rounded-xl border border-gray-100 col-span-7 shadow-sm flex flex-col relative overflow-hidden">
                        <div className="text-[10px] font-bold text-dark mb-2 z-10">Collection Routes</div>
                        <div className="flex-1 bg-green-50/10 border border-gray-100 rounded-lg relative overflow-hidden flex items-center justify-center">
                          {/* Street Grid Map Mockup */}
                          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Grid Streets */}
                            <line x1="0" y1="20" x2="300" y2="20" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="0" y1="50" x2="300" y2="50" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="0" y1="80" x2="300" y2="80" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="0" y1="100" x2="300" y2="100" stroke="#E6ECE9" strokeWidth="1" />
                            
                            <line x1="40" y1="0" x2="40" y2="120" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="100" y1="0" x2="100" y2="120" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="160" y1="0" x2="160" y2="120" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="220" y1="0" x2="220" y2="120" stroke="#E6ECE9" strokeWidth="1" />
                            <line x1="280" y1="0" x2="280" y2="120" stroke="#E6ECE9" strokeWidth="1" />

                            {/* Connecting green route */}
                            <path d="M40,80 L100,30 L160,50 L220,20 L280,70" fill="none" stroke="#009688" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

                            {/* Pins embedded in SVG */}
                            <g transform="translate(40, 80)">
                              <circle cx="0" cy="0" r="5" fill="#009688" stroke="#FFFFFF" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                            </g>
                            <g transform="translate(100, 30)">
                              <circle cx="0" cy="0" r="5" fill="#009688" stroke="#FFFFFF" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                            </g>
                            <g transform="translate(160, 50)">
                              <circle cx="0" cy="0" r="5" fill="#009688" stroke="#FFFFFF" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                            </g>
                            <g transform="translate(220, 20)">
                              <circle cx="0" cy="0" r="5" fill="#009688" stroke="#FFFFFF" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                            </g>
                            <g transform="translate(280, 70)">
                              <circle cx="0" cy="0" r="5" fill="#009688" stroke="#FFFFFF" strokeWidth="1.5" />
                              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
                            </g>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE SERVE --- */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-primary font-bold text-xs uppercase tracking-widest mb-2">INDUSTRIES WE SERVE</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-dark">Built for Every Environment</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-x-12 gap-y-12 max-w-5xl mx-auto">
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Building2 className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Municipal Corporations</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Plane className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Airports</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Train className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Railways</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Briefcase className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Universities</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Activity className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Industrial Parks</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Building className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Commercial Complexes</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Stethoscope className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Hospitals</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><Wifi className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Smart Cities</span>
            </div>
            <div className="flex flex-col items-center group">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-4 group-hover:-translate-y-1 transition-transform group-hover:border-primary group-hover:text-primary"><HomeIcon className="w-8 h-8 text-primary"/></div>
              <span className="text-sm font-bold text-dark text-center max-w-[100px]">Residential Communities</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOTTOM STATS BANNER --- */}
      <section className="bg-primary text-white py-12 border-y border-primary-hover">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-center divide-x divide-white/20">
            <div className="px-4">
              <div className="flex justify-center mb-2"><Trash2 className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">2,500+</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Smart Bins Deployed</div>
            </div>
            <div className="px-4">
              <div className="flex justify-center mb-2"><Building2 className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">100+</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Cities & Organizations</div>
            </div>
            <div className="px-4">
              <div className="flex justify-center mb-2"><Leaf className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">1.2M+</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Kg Waste Managed Daily</div>
            </div>
            <div className="px-4">
              <div className="flex justify-center mb-2"><TrendingUp className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">40%</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Operational Efficiency Improvement</div>
            </div>
            <div className="px-4">
              <div className="flex justify-center mb-2"><Recycle className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">14.2K</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Tonnes Diverted Annually</div>
            </div>
            <div className="px-4">
              <div className="flex justify-center mb-2"><Activity className="w-6 h-6 opacity-80"/></div>
              <div className="text-3xl font-bold mb-1">99.9%</div>
              <div className="text-[10px] font-medium uppercase tracking-wider opacity-80">Platform Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRE-FOOTER CTA --- */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute left-0 bottom-0 w-1/3 h-[300px] bg-green-50/50 rounded-tr-full pointer-events-none"></div>
        <div className="absolute right-0 top-0 w-1/4 h-[400px] bg-green-50/50 rounded-l-full pointer-events-none -translate-y-1/4 translate-x-1/4"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-12 overflow-hidden relative">
            
            {/* CTA Background Decorative Images/Abstracts (simulating the graphic on the left of CTA in mockup) */}
            <div className="absolute -left-10 bottom-0 opacity-40 mix-blend-multiply w-[300px] h-[300px] bg-gradient-to-tr from-primary to-transparent rounded-full blur-3xl"></div>
            <div className="hidden lg:flex absolute left-10 bottom-0 items-end">
               {/* Just a stylized representation since I don't have the exact illustration */}
               <div className="w-24 h-40 bg-gray-800 rounded-t-xl relative z-20 flex flex-col items-center pt-4">
                 <div className="w-16 h-4 bg-primary rounded-full opacity-50"></div>
                 <XCircle className="text-white w-12 h-12 mt-4 opacity-20"/>
               </div>
               <div className="w-48 h-24 bg-green-600 rounded-t-xl ml-4 relative z-10 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full border-4 border-white border-dashed animate-spin-slow"></div>
               </div>
            </div>

            {/* CTA Content */}
            <div className="lg:pl-[350px] w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-8 z-10">
              <div className="max-w-lg text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark leading-tight">Ready to Transform Your Waste Management?</h2>
                <p className="text-dark-secondary">Join leading facility managers and forward-thinking municipalities in the transition to intelligent sanitation.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 shrink-0 mt-4 md:mt-0">
                <Button className="rounded-full px-8 py-6 shadow-lg shadow-primary/20 whitespace-nowrap">
                  Request a Demo <ArrowRight className="ml-2 w-4 h-4"/>
                </Button>
                <Button variant="outline" className="rounded-full px-8 py-6 border-gray-200 whitespace-nowrap">
                  Talk to Our Experts <ArrowRight className="ml-2 w-4 h-4 text-gray-500"/>
                </Button>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}

