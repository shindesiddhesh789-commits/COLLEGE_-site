import React from 'react';
import { motion } from 'motion/react';
import { Leaf, ShieldCheck, Zap, Server, Globe2, Lightbulb, Users, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-dark/80 mix-blend-multiply"></div>
          {/* Placeholder for corporate image */}
          <div className="w-full h-full bg-gradient-to-br from-dark to-primary/20"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-secondary font-bold tracking-wider uppercase text-sm mb-4 block">About XelCo InfraTechnologies</span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Building the Digital Backbone of Urban Sanitation</h1>
          <p className="text-xl text-gray-300 leading-relaxed mb-10">
            We are an enterprise technology partner dedicated to modernizing civic infrastructure, optimizing operational efficiency, and transforming waste management at scale.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="bg-light p-10 rounded-3xl border border-border relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -mr-4 -mt-4"></div>
              <h2 className="text-3xl font-bold mb-6 text-dark flex items-center">
                <Globe2 className="text-primary mr-3 w-8 h-8" /> Our Mission
              </h2>
              <p className="text-xl text-dark-secondary leading-relaxed font-medium">
                To digitize and optimize urban sanitation through intelligent edge hardware and cloud analytics, transforming a traditionally blind industry into a highly efficient, data-driven operation.
              </p>
            </div>
            <div className="bg-dark p-10 rounded-3xl text-white relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/20 rounded-tl-[100px] -mr-4 -mb-4"></div>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Lightbulb className="text-secondary mr-3 w-8 h-8" /> Our Vision
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed font-medium">
                A world where urban infrastructure operates with peak efficiency. We envision smart cities where assets autonomously communicate their needs, ensuring clean environments and a minimized operational footprint.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-light border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-xl text-dark-secondary max-w-2xl mx-auto">The principles that guide our engineering, operations, and partnerships.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Relentless Innovation</h3>
              <p className="text-dark-secondary">Continuously pushing the boundaries of edge computing, AI, and civic hardware design.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Quantifiable Sustainability</h3>
              <p className="text-dark-secondary">We don't just talk green; we provide the hard data and ESG reports to prove environmental impact.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-blue/10 text-accent-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Server className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Digital Transformation</h3>
              <p className="text-dark-secondary">Transitioning legacy physical processes into scalable, automated, and secure digital workflows.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-border text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 bg-accent-teal/10 text-accent-teal rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Industrial Reliability</h3>
              <p className="text-dark-secondary">Engineering systems that survive extreme urban conditions and guarantee 99.9% uptime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership / Expertise */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Built by Engineers, Designed for Operations</h2>
              <p className="text-lg text-dark-secondary mb-6 leading-relaxed">
                XelCo was founded on a simple realization: the technology exists to solve the waste management crisis, but the industrial application was missing.
              </p>
              <p className="text-lg text-dark-secondary mb-8 leading-relaxed">
                Our team comprises experts from hardware manufacturing, cloud architecture, and civic supply chain logistics. We don't just sell bins; we partner with municipalities and corporations to architect custom digital infrastructures that deliver immediate ROI.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center text-dark font-medium">
                  <div className="w-8 h-8 bg-light rounded-full flex items-center justify-center mr-4 shrink-0 border border-border">
                    <BarChart3 className="w-4 h-4 text-primary" />
                  </div>
                  Data-Driven Decision Making
                </li>
                <li className="flex items-center text-dark font-medium">
                  <div className="w-8 h-8 bg-light rounded-full flex items-center justify-center mr-4 shrink-0 border border-border">
                    <Users className="w-4 h-4 text-primary" />
                  </div>
                  Dedicated Deployment Specialists
                </li>
                <li className="flex items-center text-dark font-medium">
                  <div className="w-8 h-8 bg-light rounded-full flex items-center justify-center mr-4 shrink-0 border border-border">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  ISO Certified Manufacturing
                </li>
              </ul>
            </div>
            <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-light border border-border flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop" alt="XelCo Engineering" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-dark text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Partner with the Leaders in Civic Tech</h2>
          <p className="text-xl text-gray-400 mb-10">
            Whether you are outfitting a single corporate campus or upgrading an entire metropolitan area, our team is ready to architect your custom digital infrastructure.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" onClick={() => navigate('/contact')} className="px-10 py-6 text-lg bg-primary hover:bg-primary-hover text-white rounded-xl">
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/contact')} className="px-10 py-6 text-lg border-white text-dark bg-white hover:bg-gray-100 rounded-xl">
              Talk to Our Experts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
