import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Linkedin, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">UG</span>
              </div>
              <div>
                <div className="font-bold text-lg text-white">URBAN GOLD</div>
                <div className="text-xs text-gray-400 tracking-wider">INDIA</div>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Precision Urban Mining & Circular Precious Metal Systems
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-800 hover:bg-amber-500 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm hover:text-amber-500 transition-colors">About Us</Link></li>
              <li><Link to="/opportunity" className="text-sm hover:text-amber-500 transition-colors">Opportunity</Link></li>
              <li><Link to="/technology" className="text-sm hover:text-amber-500 transition-colors">Technology</Link></li>
              <li><Link to="/roadmap" className="text-sm hover:text-amber-500 transition-colors">Roadmap</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-bold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/governance" className="text-sm hover:text-amber-500 transition-colors">Governance</Link></li>
              <li><Link to="/investors" className="text-sm hover:text-amber-500 transition-colors">Investors</Link></li>
              <li><Link to="/contact" className="text-sm hover:text-amber-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:urbangoldindia@gmail.com" className="text-sm hover:text-amber-500 transition-colors">
                  urbangoldindia@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Kolkata, West Bengal, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              © 2025 Urban Gold India. All rights reserved.
            </p>
            <p className="text-xs text-gray-500">
              Development Stage: Technical Design & Regulatory Preparation
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
