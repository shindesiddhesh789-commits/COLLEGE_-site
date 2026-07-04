import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="bg-light min-h-screen py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-dark-secondary">
            Whether you're looking to deploy smartBins, partner with us, or simply want to learn more, our team is ready to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Email Us</p>
                    <a href="mailto:ceo@xelcoinfratech.com" className="text-dark-secondary hover:text-primary transition-colors">info@xelcoinfratech.com</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Call Us</p>
                    <a href="tel:+919619773835" className="text-dark-secondary hover:text-primary transition-colors">+91 96197 73835</a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Global Headquarters</p>
                    <p className="text-dark-secondary leading-relaxed">
                      XelCo Group H.Q, BKC<br/>
                      Bandra, Mumbai<br/>
                      Maharashtra, India 400051
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mr-4">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark">Business Hours</p>
                    <p className="text-dark-secondary">Mon-Fri: 8:00 AM - 6:00 PM (PST)</p>
                    <p className="text-xs text-disabled mt-1">Expected response time: &lt;24 hours</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-dark/5 border border-border">
              {isSubmitted ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center py-16"
                  >
                   <div className="mx-auto w-20 h-20 bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
                     <Send className="w-10 h-10 ml-1" />
                   </div>
                   <h2 className="text-3xl font-bold mb-4">Message Received!</h2>
                   <p className="text-lg text-dark-secondary">Thank you for reaching out. An expert from our team will evaluate your inquiry and respond within 24 hours.</p>
                 </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Full Name" placeholder="Jane Doe" required />
                    <Input label="Email Address" type="email" placeholder="jane@company.com" required />
                  </div>
                  
                  <Input label="Company / Organization" placeholder="Optional" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select 
                      label="Product Interest"
                      options={[
                        {label: 'Homes (D2C)', value: 'homes'},
                        {label: 'Commercial (B2B)', value: 'commercial'},
                        {label: 'Municipal (B2G)', value: 'municipal'},
                        {label: 'General Inquiry', value: 'general'}
                      ]}
                      required
                    />
                    <Select 
                      label="Inquiry Type"
                      options={[
                        {label: 'Demo Request', value: 'demo'},
                        {label: 'Pricing Information', value: 'pricing'},
                        {label: 'Partnership', value: 'partnership'},
                        {label: 'Technical Support', value: 'support'},
                        {label: 'Other', value: 'other'}
                      ]}
                    />
                  </div>

                  <Textarea 
                    label="Message" 
                    placeholder="Tell us about your project, scale, or specific requirements..." 
                    className="min-h-[150px]"
                    required
                  />

                  <div className="flex items-center space-x-3 pt-2 pb-4">
                    <input 
                      type="checkbox" 
                      id="optIn" 
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <label htmlFor="optIn" className="text-sm text-dark-secondary">
                      I agree to be contacted about relevant product updates and news.
                    </label>
                  </div>

                  <Button type="submit" size="lg" className="w-full sm:w-auto px-10">
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
