
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import Button from './Button';
import { useStore } from '../context/StoreContext';

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useStore();

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/600x600/eaddd7/8c6239?text=Image+Not+Found';
    e.currentTarget.onerror = null;
  };

  return (
    <div className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden border border-gray-100 flex flex-col h-full">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={handleImageError}
        />
        {product.stock <= 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold uppercase tracking-wider">Sold Out</span>
          </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-brand-600 mb-1 uppercase tracking-wide font-medium">
          {product.category}
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-brand-700 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
           <span className="text-lg font-bold text-brand-800">KES {product.price.toLocaleString()}</span>
           <div className="flex items-center text-yellow-500 text-sm">
             <span>★</span> <span className="text-gray-600 ml-1">{product.rating}</span>
           </div>
        </div>
        <div className="mt-auto pt-4">
          <Button 
            variant="primary" 
            className="w-full" 
            disabled={product.stock <= 0}
            onClick={() => addToCart(product)}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
