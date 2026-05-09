import connectDB from './mongodb';
import Product from '../models/Product';
import Category from '../models/Category';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const demoCategories = [
  { name: 'Electronics', slug: 'electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80', description: 'Gadgets and gear' },
  { name: 'Fashion', slug: 'fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80', description: 'Latest trends' },
  { name: 'Home & Living', slug: 'home-living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&q=80', description: 'Make it cozy' },
];
const demoProducts = [
  {
    name: 'Elegant Silk Evening Dress',
    slug: 'silk-evening-dress',
    description: 'A luxurious silk evening dress perfect for special occasions. Features a graceful silhouette and premium finish.',
    price: 180.00,
    images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80'],
    stock: 15,
    rating: 4.9,
    numReviews: 42,
    isFeatured: true,
    features: ['100% Pure Silk', 'Breathable Fabric', 'Elegant Design'],
  },
  {
    name: 'Floral Summer Maxi Dress',
    slug: 'floral-summer-dress',
    description: 'Lightweight and vibrant, this floral maxi dress is your perfect companion for summer outings and beach days.',
    price: 65.00,
    images: ['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80'],
    stock: 25,
    rating: 4.7,
    numReviews: 68,
    isFeatured: false,
    features: ['Floral Print', 'Adjustable Straps', 'Cotton Blend'],
  },
  {
    name: 'Modern Party Wear Gown',
    slug: 'party-wear-gown',
    description: 'Make a statement at any party with this stunning modern gown. Designed for comfort and style.',
    price: 250.00,
    images: ['https://images.unsplash.com/photo-1539109132314-d49c02d21296?w=800&q=80'],
    stock: 10,
    rating: 4.8,
    numReviews: 29,
    isFeatured: true,
    features: ['High-Quality Tulle', 'Intricate Detailing', 'Comfortable Fit'],
  },
];

export async function seedData() {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Category.deleteMany({});

    // Create Admin User
    const adminPassword = await bcrypt.hash('admin123', 12);
    await User.create({
      name: 'Admin User',
      email: 'admin@nexacart.com',
      password: adminPassword,
      role: 'admin',
    });

    // Create Categories
    const createdCategories = await Category.insertMany(demoCategories);

    // Create Products with random categories
    const productsWithCategories = demoProducts.map((p, i) => ({
      ...p,
      category: createdCategories[i % createdCategories.length]._id,
    }));

    await Product.insertMany(productsWithCategories);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}
