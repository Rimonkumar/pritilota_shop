'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { IProduct } from '@/types';
import { useCartStore } from '@/store/useCartStore';
import toast from 'react-hot-toast';

interface ProductCardProps {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      stock: product.stock,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl overflow-hidden border border-gray-200 transition-all duration-300 hover:border-pink-500 group flex flex-col h-full"
    >
      <Link href={`/product/${product.slug}`} className="flex flex-col h-full">
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-4 flex flex-col items-center text-center flex-1 space-y-2">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px]">
            {product.name}
          </h3>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm font-bold text-gray-900 group-hover:text-pink-500 transition-colors">
              ৳ {product.price}
            </span>
            <span className="text-xs text-gray-400 line-through">
              ৳ {product.price + 50}
            </span>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className="w-full mt-2 py-2 px-4 rounded-lg bg-gray-100 text-gray-700 font-bold text-xs flex items-center justify-center space-x-2 group-hover:bg-pink-500 group-hover:text-white transition-all duration-300"
          >
            <ShoppingCart size={14} />
            <span>Add to cart</span>
          </button>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
