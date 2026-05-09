'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center overflow-hidden bg-gray-50">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-blue-100 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-100 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full text-blue-600 text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span>New Season Collection</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-gray-900 uppercase tracking-tighter">
            Elevate Your <span className="text-blue-600">Beauty</span> With Pritilota Shop
          </h1>
          
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed font-medium">
            Discover a curated collection of premium cosmetics, fashion, and beauty essentials. Experience luxury shopping like never before.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/shop" 
              className="w-full sm:w-auto bg-gray-900 text-white px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all transform hover:scale-105 shadow-xl"
            >
              <ShoppingBag size={20} />
              <span>Shop Now</span>
            </Link>
            <Link 
              href="/categories" 
              className="w-full sm:w-auto bg-white text-gray-900 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all"
            >
              <span>Explore Categories</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
            <div>
              <p className="text-2xl font-bold text-gray-900">10k+</p>
              <p className="text-sm text-gray-500">Products</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">50k+</p>
              <p className="text-sm text-gray-500">Customers</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-500">Rating</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden md:block"
        >
          <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=1200&q=80" 
              alt="Hero" 
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative elements */}
          <div className="absolute -bottom-10 -right-10 bg-white p-6 rounded-2xl shadow-xl z-20 animate-bounce-slow">
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-full text-green-600">
                <ShoppingBag size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500">New Order</p>
                <p className="font-bold">Premium Watch</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
