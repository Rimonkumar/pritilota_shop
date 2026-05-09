'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Truck, MapPin, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatPrice } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  postalCode: z.string().min(4, 'Postal code is required'),
  country: z.string().min(2, 'Country is required'),
  cardNumber: z.string().min(16, 'Invalid card number').max(16),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormValues) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success step
      clearCart();
      toast.success('Order placed successfully!');
    }, 2000);
  };

  if (items.length === 0 && step !== 3) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-center mb-16">
        <div className="flex items-center space-x-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
          <div className={`w-20 h-1 bg-gray-200 rounded-full overflow-hidden`}>
            <div className={`h-full bg-blue-600 transition-all duration-500 ${step >= 2 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
          <div className={`w-20 h-1 bg-gray-200 rounded-full overflow-hidden`}>
            <div className={`h-full bg-blue-600 transition-all duration-500 ${step >= 3 ? 'w-full' : 'w-0'}`}></div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>3</div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step < 3 ? (
          <motion.div 
            key="checkout-form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid lg:grid-cols-3 gap-12"
          >
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                {/* Shipping Info */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Truck className="text-blue-600" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2 sm:col-span-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Full Name</label>
                      <input {...register('fullName')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="John Doe" />
                      {errors.fullName && <p className="text-red-500 text-xs ml-1">{errors.fullName.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Email</label>
                      <input {...register('email')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="john@example.com" />
                      {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Address</label>
                      <input {...register('address')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="123 Tech St" />
                      {errors.address && <p className="text-red-500 text-xs ml-1">{errors.address.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">City</label>
                      <input {...register('city')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="San Francisco" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Postal Code</label>
                      <input {...register('postalCode')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="94103" />
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <CreditCard className="text-blue-600" size={24} />
                    <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white p-2 rounded-lg">
                          <CreditCard className="text-blue-600" size={24} />
                        </div>
                        <span className="font-bold text-blue-900">Credit / Debit Card</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-4 border-blue-600 bg-white"></div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-700 ml-1">Card Number</label>
                      <input {...register('cardNumber')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" placeholder="0000 0000 0000 0000" />
                      {errors.cardNumber && <p className="text-red-500 text-xs ml-1">{errors.cardNumber.message}</p>}
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-6 rounded-3xl font-bold text-xl flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-[0.98] disabled:bg-gray-400"
                >
                  {loading ? <Loader2 className="animate-spin" size={28} /> : (
                    <>
                      <span>Complete Purchase</span>
                      <ArrowRight size={24} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 p-8 rounded-3xl border border-gray-200 space-y-8 sticky top-32">
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                  {items.map((item) => (
                    <div key={item.product} className="flex items-center space-x-4">
                      <img src={item.image} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1">
                        <p className="font-bold text-sm line-clamp-1">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity} x {formatPrice(item.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Subtotal</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-gray-500">Shipping</span>
                    <span className="text-green-600 font-bold">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-4">
                    <span>Total</span>
                    <span className="text-blue-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center space-y-8 py-20"
          >
            <div className="flex justify-center">
              <div className="bg-green-100 p-8 rounded-full text-green-600">
                <CheckCircle2 size={100} />
              </div>
            </div>
            <div className="space-y-4">
              <h1 className="text-5xl font-bold text-gray-900">Order Successful!</h1>
              <p className="text-gray-500 text-lg">
                Thank you for your purchase. We've sent an email confirmation to your inbox.
                Your order number is <span className="font-bold text-gray-900">#ORD-{(Math.random() * 10000).toFixed(0)}</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <button 
                onClick={() => router.push('/dashboard')}
                className="w-full sm:w-auto bg-gray-900 text-white px-10 py-5 rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-xl"
              >
                Track Order
              </button>
              <button 
                onClick={() => router.push('/')}
                className="w-full sm:w-auto bg-white text-gray-900 px-10 py-5 rounded-2xl font-bold border border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CheckoutPage;
