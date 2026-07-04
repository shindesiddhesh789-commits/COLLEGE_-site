import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-gray-800 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div className="space-y-6">
            <Link to="/" className="flex items-center">
              <img src="/logo.png" alt="XelCo InfraTechnologies" className="h-12 md:h-14 object-contain invert brightness-200" />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs">
              Intelligent waste management solutions and urban technology for a sustainable future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Products</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/products" className="hover:text-primary transition-colors">smartBins for Homes</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">smartBins for Commercial</Link></li>
              <li><Link to="/products" className="hover:text-primary transition-colors">smartBins for Municipal</Link></li>
              <li><Link to="/solutions" className="hover:text-primary transition-colors">View All Solutions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog & Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Press Area</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Legal & Support</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
            </ul>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} XelCo InfraTechnologies Pvt. Ltd. All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <select className="bg-transparent border-none focus:ring-0 text-gray-500 cursor-pointer">
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Hindi</option>
          </select>
          <button onClick={scrollToTop} className="flex items-center hover:text-white transition-colors">
            Back to top <ArrowUp className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
