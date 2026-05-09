import connectDB from './mongodb';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const demoCategories = [
  { name: 'SUNSCREEN', slug: 'sunscreen', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80', description: 'Sun protection' },
  { name: 'SERUM', slug: 'serum', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80', description: 'Skin serums' },
  { name: 'MOISTURIZER', slug: 'moisturizer', image: 'https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=800&q=80', description: 'Skin hydration' },
  { name: 'COSMETICS', slug: 'cosmetics', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80', description: 'Beauty products' },
  { name: 'CLEANSER', slug: 'cleanser', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80', description: 'Face cleansers' },
  { name: 'TONER', slug: 'toner', image: 'https://images.unsplash.com/photo-1590156221170-cc398d0f4d7c?w=800&q=80', description: 'Skin toners' },
  { name: 'ESSENCE', slug: 'essence', image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80', description: 'Beauty essence' },
  { name: 'HAIR CARE', slug: 'hair-care', image: 'https://images.unsplash.com/photo-1527799822344-429dfa8555e0?w=800&q=80', description: 'Hair products' },
  { name: 'FASHION WEAR', slug: 'fashion-wear', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80', description: 'Clothing' },
];

const demoProducts = [
  {
    name: 'Elegant Silk Evening Dress',
    slug: 'silk-evening-dress',
    description: 'A luxurious silk evening dress perfect for special occasions.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'],
    stock: 15, rating: 4.9, numReviews: 42, isFeatured: true,
  },
  {
    name: 'Floral Summer Maxi Dress',
    slug: 'floral-summer-dress',
    description: 'Lightweight and vibrant, this floral maxi dress is your perfect companion.',
    price: 65.00,
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'],
    stock: 25, rating: 4.7, numReviews: 68, isFeatured: true,
  },
  {
    name: 'Modern Party Wear Gown',
    slug: 'party-wear-gown',
    description: 'Make a statement at any party with this stunning modern gown.',
    price: 250.00,
    images: ['https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=800&q=80'],
    stock: 10, rating: 4.8, numReviews: 29, isFeatured: true,
  },
  {
    name: 'Matte Liquid Lipstick Set',
    slug: 'matte-lipstick-set',
    description: 'Long-lasting matte liquid lipstick in 5 stunning shades.',
    price: 45.00,
    images: ['https://images.unsplash.com/photo-1586776977607-310e9c725c37?w=800&q=80'],
    stock: 100, rating: 4.6, numReviews: 150, isFeatured: true,
  },
  {
    name: 'Vitamin C Brightening Serum',
    slug: 'vitamin-c-serum',
    description: 'Brighten your skin with our pure Vitamin C serum.',
    price: 35.00,
    images: ['https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80'],
    stock: 40, rating: 4.9, numReviews: 89, isFeatured: true,
  },
  {
    name: 'Hydrating Face Cream',
    slug: 'hydrating-cream',
    description: 'Deep hydration for all skin types.',
    price: 28.00,
    images: ['https://images.unsplash.com/photo-1556227702-d1e4e7b5c232?w=800&q=80'],
    stock: 60, rating: 4.8, numReviews: 45, isFeatured: true,
  },
  {
    name: 'Designer Leather Handbag',
    slug: 'leather-handbag',
    description: 'Premium leather handbag for daily use.',
    price: 120.00,
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80'],
    stock: 20, rating: 4.7, numReviews: 32, isFeatured: true,
  },
  {
    name: 'Gold Plated Necklace',
    slug: 'gold-necklace',
    description: 'Elegant gold plated necklace with minimalist design.',
    price: 55.00,
    images: ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80'],
    stock: 15, rating: 4.9, numReviews: 21, isFeatured: true,
  },
  {
    name: 'Organic Face Wash',
    slug: 'organic-face-wash',
    description: 'Gentle organic face wash with aloe vera extracts.',
    price: 18.00,
    images: ['https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80'],
    stock: 80, rating: 4.5, numReviews: 110, isFeatured: true,
  },
  {
    name: 'Sun Protection Lotion SPF 50',
    slug: 'sun-lotion-spf50',
    description: 'Full spectrum sun protection for your outdoor adventures.',
    price: 22.00,
    images: ['https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80'],
    stock: 55, rating: 4.8, numReviews: 76, isFeatured: true,
  }
];

export async function seedData() {
  try {
    await connectDB();
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@nexacart.com',
      password: adminPassword,
      role: 'admin',
    });

    const createdCategories = await Category.insertMany(demoCategories);

    const productsWithCategories = demoProducts.map((p, i) => ({
      ...p,
      category: createdCategories[i % createdCategories.length]._id,
    }));

    await Product.insertMany(productsWithCategories);
    console.log('Database seeded with all categories successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
