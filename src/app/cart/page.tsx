'use client';

import React from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center flex flex-col items-center space-y-8">
        <div className="bg-gray-100 p-8 rounded-full text-gray-400">
          <ShoppingBag size={80} />
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">Your cart is empty</h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Go ahead and explore our collections!
          </p>
        </div>
        <Link 
          href="/shop" 
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-12">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.product}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm group hover:shadow-md transition-all"
              >
                <div className="w-32 h-32 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="font-bold text-xl text-gray-900 line-clamp-1">{item.name}</h3>
                  <p className="text-blue-600 font-bold text-lg">{formatPrice(item.price)}</p>
                  <p className="text-gray-400 text-xs">SKU: {item.product.substring(0, 8)}</p>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="flex items-center border border-gray-200 rounded-xl px-2 py-1 bg-gray-50">
                    <button 
                      onClick={() => updateQuantity(item.product, Math.max(1, item.quantity - 1))}
                      className="p-2 hover:text-blue-600 transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-bold min-w-[40px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.product, Math.min(item.stock, item.quantity + 1))}
                      className="p-2 hover:text-blue-600 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeItem(item.product)}
                    className="p-3 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 text-white p-8 rounded-3xl space-y-8 sticky top-32 shadow-2xl">
            <h2 className="text-2xl font-bold border-b border-gray-800 pb-4">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Estimated Tax</span>
                <span className="text-white font-medium">{formatPrice(getTotalPrice() * 0.08)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 flex justify-between items-center">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-bold text-blue-400">{formatPrice(getTotalPrice() * 1.08)}</span>
            </div>

            <Link 
              href="/checkout" 
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-900/20 active:scale-[0.98]"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={20} />
            </Link>

            <div className="pt-4 flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
