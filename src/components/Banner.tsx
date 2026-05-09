'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const banners = [
  {
    id: 1,
    title: "Summer Collection 2026",
    subtitle: "Get up to 50% off on all fashion items",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
    buttonText: "Shop Now",
    buttonLink: "/shop?category=fashion",
    color: "from-pink-500/20"
  },
  {
    id: 2,
    title: "Premium Skin Care",
    subtitle: "Experience luxury with our new serum collection",
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=1600&q=80",
    buttonText: "Explore Now",
    buttonLink: "/shop?category=serum",
    color: "from-blue-500/20"
  },
  {
    id: 3,
    title: "Exclusive Beauty Deals",
    subtitle: "Limited time offer on all cosmetics",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&q=80",
    buttonText: "Grab Deals",
    buttonLink: "/shop?category=cosmetics",
    color: "from-purple-500/20"
  }
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent(current === banners.length - 1 ? 0 : current + 1);
  const prevSlide = () => setCurrent(current === 0 ? banners.length - 1 : current - 1);

  return (
    <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-gray-100">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <img 
            src={banners[current].image} 
            alt={banners[current].title}
            className="w-full h-full object-cover"
          />
          
          {/* Overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r to-transparent flex items-center px-6 md:px-20",
            banners[current].color,
            "bg-black/20"
          )}>
            <div className="max-w-2xl space-y-6 text-white drop-shadow-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-sm md:text-lg font-bold tracking-[0.3em] uppercase"
              >
                {banners[current].subtitle}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-black tracking-tighter leading-none"
              >
                {banners[current].title}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link 
                  href={banners[current].buttonLink}
                  className="inline-flex items-center space-x-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                >
                  <span>{banners[current].buttonText}</span>
                  <ChevronRight size={20} />
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              current === index ? "w-10 bg-white" : "w-4 bg-white/40"
            )}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-10 hidden md:flex"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-black transition-all z-10 hidden md:flex"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// Simple cn utility for the banner if not importing from utils
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export default Banner;
