'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Search, Menu, X, Heart, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getTotalItems } = useCartStore();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'PRODUCTS', href: '/shop' },
    { name: 'ORDER TRACK', href: '/order-track' },
  ];

  const categories = [
    'SUNSCREEN', 'SERUM', 'MOISTURIZER', 'COSMETICS',
    'CLEANSER', 'TONER', 'ESSENCE', 'HAIR CARE', 'FASHION WEAR'
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-100">
      {/* Top Row: Logo, Nav, Search, Icons */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-4 flex items-center justify-between gap-8">

        {/* Logo */}
        <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="text-xl font-bold tracking-tight text-gray-900 hidden sm:block">PRITILOTA SHOP</span>
        </Link>

        {/* Main Nav (Desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-[13px] font-bold tracking-wider transition-colors hover:text-blue-600',
                pathname === link.href ? 'text-blue-600' : 'text-gray-500'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden md:flex flex-1 max-w-xl relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
          <input
            type="text"
            placeholder="SEARCH FOR PRODUCTS..."
            className="w-full pl-12 pr-4 py-2.5 rounded-full border border-gray-200 bg-gray-50 text-xs font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all uppercase tracking-wider"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-6">
          <Link href="/wishlist" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <Heart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">0</span>
          </Link>

          <Link href="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {getTotalItems()}
            </span>
          </Link>

          <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors">
            <User size={22} />
          </Link>

          <button
            className="lg:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Bottom Row: Categories (Desktop Only) */}
      <div className="hidden lg:block border-t border-gray-50 py-3 bg-gray-50/50">
        <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-center space-x-10">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/shop?category=${cat.toLowerCase().replace(/ /g, '-')}`}
              className="text-[11px] font-bold text-gray-500 hover:text-blue-600 transition-colors tracking-widest whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 lg:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white z-[60] shadow-2xl lg:hidden overflow-y-auto"
            >
              <div className="p-6 space-y-8">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-xl uppercase tracking-tighter">Menu</span>
                  <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
                </div>

                <div className="flex flex-col space-y-5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-lg font-bold border-b border-gray-100 pb-2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xs font-black text-gray-400 tracking-[0.2em] uppercase">Categories</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {categories.map((cat) => (
                      <Link
                        key={cat}
                        href={`/shop?category=${cat.toLowerCase().replace(/ /g, '-')}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-sm font-bold text-gray-600"
                      >
                        {cat}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
