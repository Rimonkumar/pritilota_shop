'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import { Package, DollarSign, Image as ImageIcon, Tag, Hash, Layout, Save, Loader2, Plus, X } from 'lucide-react';
import { ICategory } from '@/types';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const productSchema = z.object({
  name: z.string().min(3, 'Product name is required'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description should be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock cannot be negative'),
  category: z.string().min(1, 'Category is required'),
  isFeatured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

const AddProductPage = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      price: 0,
      stock: 10,
      isFeatured: false,
    }
  });

  // Auto-generate slug from name
  const name = watch('name');
  useEffect(() => {
    if (name) {
      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      setValue('slug', slug);
    }
  }, [name, setValue]);

  const handleAddImageUrl = () => setImageUrls([...imageUrls, '']);
  const handleRemoveImageUrl = (index: number) => {
    const newUrls = [...imageUrls];
    newUrls.splice(index, 1);
    setImageUrls(newUrls.length ? newUrls : ['']);
  };
  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const onSubmit = async (data: ProductFormValues) => {
    const finalImages = imageUrls.filter(url => url.trim() !== '');
    if (finalImages.length === 0) {
      toast.error('At least one image URL is required');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, images: finalImages }),
      });

      if (!res.ok) throw new Error('Failed to create product');

      toast.success('Product uploaded successfully!');
      router.push('/shop');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center space-x-4 mb-12">
        <div className="bg-blue-600 p-3 rounded-2xl text-white">
          <Plus size={32} />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-gray-500">Create a new listing for your store</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* General Info */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 md:col-span-2">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Layout size={20} className="text-blue-600" />
              <span>General Information</span>
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Product Name</label>
                <div className="relative">
                  <Package className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input {...register('name')} placeholder="e.g. Sony WH-1000XM5" className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                </div>
                {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Slug (Auto-generated)</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input {...register('slug')} className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-100 focus:outline-none cursor-not-allowed" readOnly />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Description</label>
                <textarea {...register('description')} rows={4} placeholder="Tell us more about the product..." className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
                {errors.description && <p className="text-red-500 text-xs ml-1">{errors.description.message}</p>}
              </div>
            </div>
          </div>

          {/* Pricing & Stock */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <DollarSign size={20} className="text-blue-600" />
              <span>Pricing & Inventory</span>
            </h2>
            <div className="space-y-4">
               <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Price ($)</label>
                <input type="number" step="0.01" {...register('price', { valueAsNumber: true })} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Stock Quantity</label>
                <input type="number" {...register('stock', { valueAsNumber: true })} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" />
              </div>
            </div>
          </div>

          {/* Category & Status */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <h2 className="text-xl font-bold flex items-center space-x-2">
              <Tag size={20} className="text-blue-600" />
              <span>Organization</span>
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                <select {...register('category')} className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all appearance-none font-medium">
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-2xl border border-gray-200 bg-gray-50 hover:bg-blue-50 transition-colors">
                <input type="checkbox" {...register('isFeatured')} className="w-5 h-5 accent-blue-600 rounded-lg" />
                <span className="font-bold text-gray-700">Mark as Featured</span>
              </label>
            </div>
          </div>

          {/* Media */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6 md:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <ImageIcon size={20} className="text-blue-600" />
                <span>Product Images</span>
              </h2>
              <button type="button" onClick={handleAddImageUrl} className="text-blue-600 font-bold text-sm flex items-center space-x-1 hover:underline">
                <Plus size={16} />
                <span>Add Another URL</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {imageUrls.map((url, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="relative flex-1">
                    <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      value={url} 
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      placeholder="https://images.unsplash.com/..." 
                      className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
                    />
                  </div>
                  {imageUrls.length > 1 && (
                    <button type="button" onClick={() => handleRemoveImageUrl(index)} className="p-4 text-gray-400 hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8">
           <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-bold text-lg flex items-center justify-center space-x-3 hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200 active:scale-[0.98] disabled:bg-gray-400"
          >
            {loading ? <Loader2 className="animate-spin" size={24} /> : (
              <>
                <Save size={24} />
                <span>Publish Product</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductPage;
