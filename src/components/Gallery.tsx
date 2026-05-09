'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Search } from 'lucide-react';

const galleryImages = [
  { id: 1, url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80', size: 'large' },
  { id: 2, url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', size: 'small' },
  { id: 3, url: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80', size: 'small' },
  { id: 4, url: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', size: 'medium' },
  { id: 5, url: 'https://images.unsplash.com/photo-1590156221170-cc398d0f4d7c?w=800&q=80', size: 'medium' },
  { id: 6, url: 'https://images.unsplash.com/photo-1515377196229-470075d7970d?w=800&q=80', size: 'small' },
];

const Gallery = () => {
  return (
    <section className="max-w-[1400px] mx-auto px-6 py-24 bg-white">
      <div className="text-center space-y-4 mb-16">
        <div className="inline-flex items-center space-x-2 text-pink-500 font-bold uppercase tracking-widest text-xs">
          <Camera size={16} />
          <span>Follow Us @PritilotaShop</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase italic text-gray-900">
          Our <span className="text-pink-500">Beauty</span> Gallery
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto font-medium">
          Get inspired by our community and discover the magic of premium beauty products in real life.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px] md:h-[800px]">
        {/* Large Image */}
        <div className="col-span-2 row-span-2 relative group overflow-hidden rounded-3xl">
          <img src={galleryImages[0].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Search className="text-white" size={32} />
          </div>
        </div>

        {/* Small Images */}
        <div className="relative group overflow-hidden rounded-3xl">
          <img src={galleryImages[1].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Search className="text-white" size={24} />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl">
          <img src={galleryImages[2].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Search className="text-white" size={24} />
          </div>
        </div>

        {/* Medium Images */}
        <div className="col-span-1 md:col-span-2 relative group overflow-hidden rounded-3xl h-[200px] md:h-auto">
          <img src={galleryImages[3].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Search className="text-white" size={24} />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl">
          <img src={galleryImages[4].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Search className="text-white" size={24} />
          </div>
        </div>

        <div className="relative group overflow-hidden rounded-3xl">
          <img src={galleryImages[5].url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
             <Search className="text-white" size={24} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
