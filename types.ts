
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  stock: number;
  history?: string; // For AI generation context
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface Feedback {
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  paymentMethod: 'mpesa' | 'card' | 'paypal';
  feedback?: Feedback;
  customerName?: string; // For admin display
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
