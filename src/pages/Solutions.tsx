import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Building2, Building, Plane, Train, GraduationCap, Stethoscope, Factory, Home, Landmark, Database, Route, LineChart, Settings } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

const industries = [
  {
    id: 'municipal',
    title: 'Municipal Corporations',
    icon: <Landmark className="w-8 h-8" />,
    description: 'Transform city-wide sanitation with ruggedized, solar-powered compaction bins and AI-driven dynamic routing to eliminate overflows and cut fleet fuel usage by 45%.',
    productLine: 'municipal',
    productLabel: 'Municipal Bins'
  },
  {
    id: 'smart-cities',
    title: 'Smart Cities',
    icon: <Building2 className="w-8 h-8" />,
    description: 'Integrate waste infrastructure directly into civic dashboards. Our open APIs connect seamlessly with 311 systems for real-time urban management.',
    productLine: 'municipal',
    productLabel: 'Municipal Bins'
  },
  {
    id: 'commercial',
    title: 'Commercial Complexes',
    icon: <Building className="w-8 h-8" />,
    description: 'Automate multi-stream segregation and generate instant, audit-ready ESG sustainability reports for shopping malls and premium office spaces.',
    productLine: 'commercial',
    productLabel: 'Commercial Bins'
  },
  {
    id: 'airports',
    title: 'Airports',
    icon: <Plane className="w-8 h-8" />,
    description: 'Maintain pristine hygiene in high-footfall terminals. Real-time alerts route janitorial staff only to bins that actually need emptying, saving crucial labor hours.',
    productLine: 'commercial',
    productLabel: 'Commercial Bins'
  },
  {
    id: 'railways',
    title: 'Railways & Transit',
    icon: <Train className="w-8 h-8" />,
    description: 'Deploy vandal-proof, high-capacity infrastructure capable of handling massive daily waste volumes across distributed transit networks.',
    productLine: 'municipal',
    productLabel: 'Municipal Bins'
  },
  {
    id: 'universities',
    title: 'Universities',
    icon: <GraduationCap className="w-8 h-8" />,
    description: 'Foster campus sustainability. Our gamified systems encourage student recycling while drastically reducing campus facilities management costs.',
    productLine: 'commercial',
    productLabel: 'Commercial Bins'
  },
  {
    id: 'hospitals',
    title: 'Hospitals & Healthcare',
    icon: <Stethoscope className="w-8 h-8" />,
    description: 'Ensure 100% touchless, hygienic disposal of non-hazardous waste in public areas, waiting rooms, and cafeterias with active odor neutralization.',
    productLine: 'commercial',
    productLabel: 'Commercial Bins'
  },
  {
    id: 'industrial',
    title: 'Industrial Parks',
    icon: <Factory className="w-8 h-8" />,
    description: 'Industrial-grade reliability for factory floors and logistics hubs. Monitor large-scale waste generation and optimize heavy truck collection schedules.',
    productLine: 'commercial',
    productLabel: 'Commercial Bins'
  },
  {
    id: 'residential',
    title: 'Residential Communities',
    icon: <Home className="w-8 h-8" />,
    description: 'Equip luxury housing societies with intelligent, odor-free bins that enforce segregation mandates and optimize housekeeping staff routes.',
    productLine: 'residential',
    productLabel: 'Residential Bins'
  }
];

export default function Solutions() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">Enterprise Solutions</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Purpose-Built for Every Sector</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
            From smart cities to premium commercial complexes, XelCo provides tailored hardware and software ecosystems to optimize operational efficiency and drive smart city transformation.
          </p>
        </div>
      </section>

      {/* Problem & Impact */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-red-500 font-bold tracking-wider uppercase text-sm mb-3 block">The Problem & Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The True Cost of Blind Operations</h2>
            <p className="text-lg text-dark-secondary leading-relaxed mb-8">
              Legacy waste management forces organizations to rely on static collection schedules. This results in fleets driving to empty bins (wasting fuel and labor) while allowing high-traffic bins to overflow (damaging brand reputation and hygiene).
            </p>
          </div>
        </div>
      </section>

      {/* Solution & How It Works */}
      <section className="py-20 bg-light border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-primary font-bold tracking-wider uppercase text-sm mb-3 block">Our Solution</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-Time Infrastructure Intelligence</h2>
              <p className="text-lg text-dark-secondary leading-relaxed mb-8">
                We deploy ruggedized smart bins equipped with IoT telemetry to monitor capacity in real-time. Our AI platform then processes this data to generate dynamic, optimized collection routes—drastically cutting operational costs.
              </p>
              <h3 className="text-xl font-bold mb-4">How It Works:</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 shrink-0">1</div>
                  <p className="text-dark"><strong>Deploy:</strong> Install smart bins or retrofit existing infrastructure.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 shrink-0">2</div>
                  <p className="text-dark"><strong>Monitor:</strong> IoT sensors transmit real-time fill levels to the XelCo Cloud.</p>
                </li>
                <li className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-3 shrink-0">3</div>
                  <p className="text-dark"><strong>Optimize:</strong> AI generates optimized daily routes for your sanitation fleet.</p>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
               {/* Decorative grid */}
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-border"><Database className="w-8 h-8 text-primary mb-4"/> <p className="font-bold">Data Aggregation</p></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-border mt-8"><Route className="w-8 h-8 text-accent-blue mb-4"/> <p className="font-bold">Dynamic Routing</p></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-border -mt-8"><LineChart className="w-8 h-8 text-accent-teal mb-4"/> <p className="font-bold">ESG Reporting</p></div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-border"><Settings className="w-8 h-8 text-secondary mb-4"/> <p className="font-bold">Predictive Maintenance</p></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sector Specific Benefits */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Sector-Specific Outcomes</h2>
            <p className="text-xl text-dark-secondary max-w-2xl mx-auto">Discover how our intelligent infrastructure drives measurable efficiency across diverse environments.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind, idx) => (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-light rounded-3xl p-8 border border-border shadow-sm flex flex-col hover:border-primary/50 transition-colors group"
              >
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors border border-border group-hover:border-primary">
                  {ind.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{ind.title}</h3>
                <p className="text-dark-secondary leading-relaxed mb-8 flex-grow">
                  {ind.description}
                </p>
                <Button 
                  onClick={() => navigate('/contact')}
                  className="px-6 rounded-xl shadow-md shadow-primary/10 font-bold flex items-center text-left hover:text-primary-hover transition-colors w-full justify-center"
                >
                  {ind.productLine === 'municipal' ? 'Request a Pilot Deployment' : 'Request a Demo'} <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Compliance CTA */}
      <section className="py-24 border-t border-border bg-dark text-white text-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">Enterprise & Government Compliance</h2>
          <p className="text-xl text-gray-400 mb-12">
            Our IoT infrastructure is built to meet rigorous municipal tender requirements, ISO certifications, and corporate data security standards.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/contact')} className="px-8 text-lg bg-primary hover:bg-primary-hover text-white">
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')} className="px-8 text-lg border-white text-dark bg-white hover:bg-gray-100">
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
