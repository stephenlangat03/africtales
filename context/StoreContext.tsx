import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, User, Order, Feedback } from '../types';
import { PRODUCTS } from '../constants';

interface StoreContextType {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  user: User | null;
  login: (email: string, role: 'admin' | 'customer') => void;
  logout: () => void;
  orders: Order[];
  placeOrder: (order: Order) => void;
  addProduct: (product: Product) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  addOrderFeedback: (orderId: string, feedback: Feedback) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize products from localStorage or use default constants
  // Changed key to 'africtales_products_v5' to force load new product list with fixed URLs
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem('africtales_products_v5');
      return savedProducts ? JSON.parse(savedProducts) : PRODUCTS;
    } catch (e) {
      console.error("Failed to parse products from local storage", e);
      return PRODUCTS;
    }
  });

  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  
  // Initialize orders from localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const savedOrders = localStorage.getItem('africtales_orders');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (e) {
      console.error("Failed to parse orders from local storage", e);
      return [];
    }
  });

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('africtales_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    const savedUser = localStorage.getItem('africtales_user');
    if (savedUser) {
        try {
            setUser(JSON.parse(savedUser));
        } catch (e) {
            console.error("Failed to parse user", e);
        }
    }
  }, []);

  // Save cart to local storage on change
  useEffect(() => {
    localStorage.setItem('africtales_cart', JSON.stringify(cart));
  }, [cart]);
  
  // Save user
  useEffect(() => {
      if (user) {
          localStorage.setItem('africtales_user', JSON.stringify(user));
      } else {
          localStorage.removeItem('africtales_user');
      }
  }, [user]);

  // Save products to local storage on change
  useEffect(() => {
    localStorage.setItem('africtales_products_v5', JSON.stringify(products));
  }, [products]);

  // Save orders to local storage on change
  useEffect(() => {
    localStorage.setItem('africtales_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const login = (email: string, role: 'admin' | 'customer') => {
    setUser({
      id: email.includes('admin') ? 'admin-1' : 'user-' + Math.random().toString(36).substr(2, 5),
      name: email.split('@')[0],
      email,
      role
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('africtales_user');
  };

  const placeOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
    clearCart();
  };

  const addProduct = (product: Product) => {
    setProducts(prev => [product, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const addOrderFeedback = (orderId: string, feedback: Feedback) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, feedback } : o));
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        user,
        login,
        logout,
        orders,
        placeOrder,
        addProduct,
        updateOrderStatus,
        addOrderFeedback
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within StoreProvider');
  return context;
};