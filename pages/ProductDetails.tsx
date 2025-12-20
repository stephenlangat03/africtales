
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';
import { getCulturalInsight } from '../services/geminiService';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const product = products.find(p => p.id === id);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    setAiInsight(null);
  }, [id]);

  const handleAskAI = async () => {
    if (!product) return;
    setIsLoadingAi(true);
    const insight = await getCulturalInsight(product.name, product.history);
    setAiInsight(insight);
    setIsLoadingAi(false);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/800x800/eaddd7/8c6239?text=Image+Not+Found';
    e.currentTarget.onerror = null;
  };

  if (!product) {
    return <div className="p-12 text-center">Product not found. <Link to="/shop" className="text-brand-600 underline">Back to Shop</Link></div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image */}
        <div className="aspect-square w-full rounded-lg overflow-hidden bg-gray-100 mb-8 lg:mb-0">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover" 
            onError={handleImageError}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-brand-600 tracking-wide uppercase">{product.category}</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            <span className="text-3xl font-bold text-brand-800 mr-4">KES {product.price.toLocaleString()}</span>
            <div className="flex items-center text-yellow-500">
                {'★'.repeat(Math.round(product.rating))}
                {'☆'.repeat(5 - Math.round(product.rating))}
                <span className="ml-2 text-gray-400 text-sm">({product.rating} / 5)</span>
            </div>
          </div>

          <div className="prose prose-stone text-gray-600 mb-8">
            <p>{product.description}</p>
          </div>

          {/* AI Feature */}
          <div className="bg-brand-50 p-6 rounded-lg border border-brand-100 mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-brand-800 uppercase flex items-center gap-2">
                <span className="text-lg">✨</span> Cultural Insight
              </h3>
              {!aiInsight && !isLoadingAi && (
                <button 
                  onClick={handleAskAI}
                  className="text-xs font-bold text-accent-600 hover:text-accent-700 underline"
                >
                  Ask AI about this
                </button>
              )}
            </div>
            
            {isLoadingAi ? (
              <div className="animate-pulse space-y-2">
                 <div className="h-2 bg-brand-200 rounded w-3/4"></div>
                 <div className="h-2 bg-brand-200 rounded w-1/2"></div>
              </div>
            ) : aiInsight ? (
              <p className="text-sm text-brand-900 italic leading-relaxed">"{aiInsight}"</p>
            ) : (
              <p className="text-xs text-brand-400">Discover the history and symbolism behind this artifact powered by Gemini AI.</p>
            )}
          </div>

          <div className="mt-auto">
            <Button 
              size="lg" 
              className="w-full md:w-auto" 
              disabled={product.stock <= 0}
              onClick={() => addToCart(product)}
            >
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </Button>
            <p className="mt-4 text-xs text-gray-500 flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              In stock and ready to ship.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
