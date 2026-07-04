import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/lib/AuthContext';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-white border-b border-border ${
          isScrolled ? 'py-4 shadow-sm' : 'py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="XelCo InfraTechnologies" className="h-12 md:h-14 object-contain" />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-primary relative py-2 ${
                    location.pathname === item.path ? 'text-primary font-semibold' : 'text-dark-secondary'
                  }`}
                >
                  {item.name}
                  {location.pathname === item.path && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline" className="border-slate-300 font-medium cursor-pointer">Log In</Button>
              </Link>
              <Button onClick={() => setIsDemoModalOpen(true)} className="cursor-pointer">Request a Demo</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-dark hover:text-primary p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 pt-24 bg-white md:hidden"
          >
            <div className="px-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-2xl font-semibold tracking-tight transition-colors ${
                    location.pathname === item.path ? 'text-primary' : 'text-dark-secondary'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-8 space-y-4">
                <Link to="/login" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12 text-sm font-semibold mb-2 cursor-pointer">Log In</Button>
                </Link>
                <Button className="w-full cursor-pointer" size="lg" onClick={() => { setIsMobileMenuOpen(false); setIsDemoModalOpen(true); }}>
                  Request a Demo
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
}

function DemoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={submitted ? "Request Sent!" : "Request a Demo"}>
      {submitted ? (
        <div className="text-center py-8">
          <div className="mx-auto w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-lg text-dark-secondary pb-4">Thank you! An expert will reach out within 24 hours.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-dark-secondary text-sm mb-6">Fill out a quick form so we can understand your requirements and provide relevant options.</p>
          <div className="grid grid-cols-2 gap-4">
            <Input label="First Name" required />
            <Input label="Last Name" required />
          </div>
          <Input label="Corporate Email" type="email" required />
          <Input label="Company/Organization" required />
          <Select 
            label="Segment Interest" 
            options={[
              {label: 'Homes (D2C)', value: 'homes'},
              {label: 'Commercial (B2B)', value: 'commercial'},
              {label: 'Municipal (B2G)', value: 'municipal'},
            ]}
            required 
          />
          <div className="pt-4 pt-4 flex space-x-3">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Submit Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
