'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICategory } from '@/types';
import { motion } from 'framer-motion';

const CategoryList = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        const data = await res.json();
        setCategories(data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) return null; // Or skeleton

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.slice(0, 3).map((category, index) => (
          <Link 
            key={category._id} 
            href={`/shop?category=${category.slug}`}
            className="group relative h-80 rounded-3xl overflow-hidden"
          >
            <img 
              src={category.image || 'https://via.placeholder.com/400x300'} 
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white space-y-2">
              <h3 className="text-2xl font-bold">{category.name}</h3>
              <p className="text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0 duration-300">
                Explore Collection
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryList;
