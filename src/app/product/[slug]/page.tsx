'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ShoppingBag, Heart, Check, Minus, Plus, ShoppingCart } from 'lucide-react';
import { IProduct } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${slug}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: quantity,
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) return <div className="p-20 text-center animate-pulse font-bold">Loading...</div>;
  if (!product) return <div className="p-20 text-center font-bold">Product not found.</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Column: Image Gallery */}
        <div className="space-y-6">
          <div className="relative aspect-[4/5] rounded-2xl border border-gray-200 overflow-hidden bg-white">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <span>No image available</span>
              </div>
            )}
            <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-sm hover:text-red-500 transition-colors">
              <Heart size={20} />
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images && product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "w-20 h-20 rounded-lg border-2 flex-shrink-0 overflow-hidden transition-all",
                  activeImage === i ? "border-blue-600" : "border-gray-100 opacity-60 hover:opacity-100"
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Product Info */}
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-orange-500 text-xs font-bold uppercase tracking-widest">
              {typeof product.category === 'object' ? product.category.name : 'Category'}
            </p>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-snug">
              {product.name}
            </h1>
          </div>

          <div className="space-y-1 text-sm text-gray-500">
            <p>Brand: <span className="font-bold text-gray-700">Megalast</span></p>
            <p>SKU: <span className="text-gray-700 font-medium">0234GH678</span></p>
            <p className="flex items-center text-green-500 font-bold">
              <Check size={16} className="mr-1" />
              in stock
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-3xl font-bold text-gray-900">৳ {product.price}</span>
            <span className="text-xl text-gray-400 line-through">৳ {product.price + 500}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-200 rounded-lg h-12 bg-white">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 flex items-center justify-center hover:text-blue-600 transition-colors">
                <Minus size={14} />
              </button>
              <span className="w-10 flex items-center justify-center font-bold">{quantity}</span>
              <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="w-10 flex items-center justify-center hover:text-blue-600 transition-colors">
                <Plus size={14} />
              </button>
            </div>

            {/* Buttons */}
            <button className="h-12 px-10 bg-black text-white font-bold rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-all uppercase text-sm tracking-widest">
              <span>BUY NOW</span>
              <ShoppingBag size={18} />
            </button>

            <button
              onClick={handleAddToCart}
              className="h-12 px-10 border-2 border-gray-900 text-gray-900 font-bold rounded-lg flex items-center space-x-2 hover:bg-gray-900 hover:text-white transition-all uppercase text-sm tracking-widest"
            >
              <span>ADD TO CARD</span>
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Features/Description Tabs */}
          <div className="pt-10 border-t border-gray-100">
            <div className="flex space-x-8 border-b border-gray-100 mb-8 overflow-x-auto scrollbar-hide">
              {['ADDITIONAL INFORMATION', 'DESCRIPTION', 'REVIEWS (0)'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={cn(
                    "pb-4 text-xs font-bold tracking-widest transition-all relative",
                    activeTab === tab.toLowerCase() ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  {tab}
                  {activeTab === tab.toLowerCase() && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </div>

            <div className="text-gray-600 text-sm leading-relaxed">
              {activeTab === 'description' && (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  <p className="font-bold text-gray-900">Fit Type: <span className="font-medium text-gray-600 ml-2">Slim Fit</span></p>
                </div>
              )}
              {activeTab.includes('additional') && <p>Detailed specification for {product.name} will be listed here.</p>}
              {activeTab.includes('reviews') && <p>No reviews yet. Be the first to review this product!</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
