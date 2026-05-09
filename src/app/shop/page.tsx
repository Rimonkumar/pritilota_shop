'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Search, Filter, SlidersHorizontal, ChevronRight, LayoutGrid, List, X } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { IProduct, ICategory } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const ShopContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const currentCategory = searchParams.get('category') || 'all';
  const currentSort = searchParams.get('sort') || 'latest';

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch(`/api/products?category=${currentCategory}&sort=${currentSort}&search=${searchQuery}`, { cache: 'no-store' }),
          fetch('/api/categories')
        ]);
        const prodData = await prodRes.json();
        const catData = await catRes.json();
        
        const filteredProds = Array.isArray(prodData) 
          ? prodData.filter((p: IProduct) => p.price >= minPrice && p.price <= maxPrice)
          : [];

        setProducts(filteredProds);
        setCategories(catData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentCategory, currentSort, searchQuery, minPrice, maxPrice]);

  const handleCategoryChange = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === 'all') params.delete('category');
    else params.set('category', slug);
    router.push(`/shop?${params.toString()}`);
  };

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', sort);
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 flex flex-col lg:row gap-12">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 space-y-12">
        {/* Categories */}
        <div className="space-y-6">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center space-x-2">
            <Filter size={16} />
            <span>Product Categories</span>
          </h3>
          <div className="flex flex-col space-y-1">
            <button
              onClick={() => handleCategoryChange('all')}
              className={cn(
                "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                currentCategory === 'all' ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"
              )}
            >
              <span>All Collections</span>
              <ChevronRight size={14} className={cn("transition-transform", currentCategory === 'all' && "rotate-90")} />
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={cn(
                  "group flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all",
                  currentCategory === cat.slug ? "bg-black text-white" : "hover:bg-gray-100 text-gray-600"
                )}
              >
                <span>{cat.name}</span>
                <ChevronRight size={14} className={cn("transition-transform", currentCategory === cat.slug && "rotate-90")} />
              </button>
            ))}
          </div>
        </div>

        {/* Premium Price Filter */}
        <div className="space-y-8 p-6 rounded-3xl bg-gray-50 border border-gray-100">
          <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 flex items-center space-x-2">
            <SlidersHorizontal size={16} />
            <span>Filter By Price</span>
          </h3>
          
          <div className="space-y-6">
            <div className="relative h-2 w-full bg-gray-200 rounded-full">
              <div 
                className="absolute h-full bg-blue-600 rounded-full" 
                style={{ 
                  left: `${(minPrice / 5000) * 100}%`, 
                  right: `${100 - (maxPrice / 5000) * 100}%` 
                }} 
              />
              <input 
                type="range" min="0" max="5000" step="10" value={minPrice}
                onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100))}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:appearance-none cursor-pointer"
              />
              <input 
                type="range" min="0" max="5000" step="10" value={maxPrice}
                onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100))}
                className="absolute w-full h-2 bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-blue-600 [&::-webkit-slider-thumb]:appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-black text-gray-400 uppercase">Min</span>
                <div className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs">
                  <span>৳</span>
                  <input type="number" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full bg-transparent focus:outline-none ml-1" />
                </div>
              </div>
              <div className="flex-1 space-y-1 text-right">
                <span className="text-[10px] font-black text-gray-400 uppercase">Max</span>
                <div className="flex items-center px-3 py-2 bg-white border border-gray-200 rounded-xl font-bold text-xs justify-end">
                  <span>৳</span>
                  <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full bg-transparent focus:outline-none ml-1 text-right" />
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => { setMinPrice(0); setMaxPrice(5000); }}
              className="w-full py-3 bg-white text-gray-500 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gray-100 transition-all border border-gray-200"
            >
              Reset Filter
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-10">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-6 md:items-end justify-between border-b border-gray-100 pb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter uppercase italic text-gray-900">Collection</h1>
            <div className="flex items-center space-x-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span>Home</span>
              <ChevronRight size={12} />
              <span className="text-blue-600">Shop</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative group min-w-[280px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search collection..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-gray-100 bg-gray-50 text-xs font-bold focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all uppercase tracking-wider"
              />
              {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"><X size={14} /></button>}
            </div>

            <div className="flex items-center bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
               <select 
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                className="bg-transparent px-4 py-2 text-xs font-bold focus:outline-none appearance-none cursor-pointer uppercase tracking-wider"
              >
                <option value="latest">Sort: Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
          <AnimatePresence mode="popLayout">
            {loading ? (
              [...Array(6)].map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-gray-50 rounded-3xl animate-pulse border border-gray-100" />
              ))
            ) : products.length > 0 ? (
              products.map((product) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-32 text-center space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                  <Search size={40} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-gray-900 uppercase tracking-tighter">No products matched your search</h3>
                  <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
                </div>
                <button onClick={() => { setMinPrice(0); setMaxPrice(5000); handleCategoryChange('all'); setSearchQuery(''); }} className="px-8 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-all">Clear All Filters</button>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center animate-pulse font-black uppercase tracking-widest text-gray-400">Initializing Shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
