'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { IProduct } from '@/types';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedProducts = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products?featured=true');
        const data = await res.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-12">
        <div className="h-10 w-64 bg-gray-200 animate-pulse rounded-lg"></div>
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded-lg"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="aspect-[4/5] bg-gray-200 animate-pulse rounded-2xl"></div>
        ))}
      </div>
    </div>
  );

  if (products.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-end justify-between mb-12">
        <div className="space-y-4">
          <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Our Favorites</p>
          <h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
        </div>
        <Link
          href="/shop"
          className="flex items-center space-x-2 text-gray-900 font-bold hover:text-blue-600 transition-colors group"
        >
          <span>View All Shop</span>
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
