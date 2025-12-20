import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';
import Button from '../components/Button';
import { CATEGORIES } from '../constants';

const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="bg-brand-50">
      {/* Hero Section */}
      <section className="relative bg-brand-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
           <img 
            src="https://picsum.photos/seed/africanart/1200/600" 
            alt="African Art Background" 
            className="w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-r from-brand-900 via-brand-900/80 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-lg">
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-brand-50">
              Timeless <span className="text-accent-500">African</span> Elegance
            </h1>
            <p className="text-xl text-brand-200 mb-8">
              Discover authentic beadwork, rare antiques, and hand-crafted artifacts that tell the stories of a continent.
            </p>
            <div className="flex space-x-4">
              <Link to="/shop">
                <Button size="lg" variant="secondary">Shop Collection</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-center text-brand-900 mb-12">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {CATEGORIES.filter(c => c !== 'All').slice(0, 4).map((cat, idx) => (
            <Link key={cat} to={`/shop?category=${cat}`} className="group relative rounded-xl overflow-hidden aspect-[4/5] shadow-lg">
              <img 
                src={`https://picsum.photos/seed/${cat.toLowerCase()}/400/500`} 
                alt={cat} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                <h3 className="text-xl font-bold text-white">{cat}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-serif font-bold text-brand-900">Trending Artifacts</h2>
            <Link to="/shop" className="text-brand-600 font-medium hover:text-brand-800">View All &rarr;</Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust/Info Strip */}
      <section className="bg-brand-100 py-12 border-t border-brand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🌍</div>
            <h3 className="font-bold text-brand-900">Authentic Sourcing</h3>
            <p className="text-sm text-brand-700 mt-2">Directly from artisans and trusted collectors across Africa.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">🔒</div>
            <h3 className="font-bold text-brand-900">Secure Payments</h3>
            <p className="text-sm text-brand-700 mt-2">Safe transactions via M-Pesa, PayPal, and Cards.</p>
          </div>
          <div>
            <div className="w-12 h-12 bg-brand-200 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">📦</div>
            <h3 className="font-bold text-brand-900">Global Shipping</h3>
            <p className="text-sm text-brand-700 mt-2">We deliver heritage to your doorstep, anywhere.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;