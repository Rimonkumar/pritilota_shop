export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  image?: string;
  wishlist?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image?: string;
  description?: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  images: string[];
  category: ICategory | string;
  stock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  features?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface ICartItem {
  product: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  stock: number;
}

export interface IOrder {
  _id: string;
  user: string;
  orderItems: ICartItem[];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: string;
  isDelivered: boolean;
  deliveredAt?: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
}
