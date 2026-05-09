import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Company Info */}
        <div className="space-y-6">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-blue-500">
            PRITILOTA<span className="text-white"> SHOP</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Pritilota Shop is the leading destination for premium cosmetics and fashion. We provide high-quality products with exceptional customer service.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-blue-500 transition-colors"><Globe size={20} /></a>
            <a href="#" className="hover:text-blue-400 transition-colors"><Share2 size={20} /></a>
            <a href="#" className="hover:text-pink-500 transition-colors"><Mail size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
            <li><Link href="/categories" className="hover:text-white transition-colors">Categories</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping Info</Link></li>
            <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-gray-400 text-sm">
            <li className="flex items-center space-x-3">
              <MapPin size={18} className="text-blue-500" />
              <span>123 Tech Avenue, Silicon Valley, CA</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone size={18} className="text-blue-500" />
              <span>+1 (555) 000-0000</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail size={18} className="text-blue-500" />
              <span>support@nexacart.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Pritilota Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
