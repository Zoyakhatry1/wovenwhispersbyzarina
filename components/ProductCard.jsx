'use client';

import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-sm flex flex-col p-2 sm:p-2.5 gap-2">
      {/* Square Image */}
      <div
        className="relative w-full bg-gray-100 rounded flex items-center justify-center"
        style={{ aspectRatio: '1 / 1' }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover rounded"
          />
        ) : (
          <span className="text-4xl sm:text-5xl">{product.emoji}</span>
        )}
        {product.badge && (
          <div className="absolute top-1.5 left-1.5 bg-amber-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
            {product.badge}
          </div>
        )}
      </div>

      {/* Name */}
      <h3
        className="text-xs sm:text-sm font-semibold text-slate-800 text-center leading-snug flex-grow"
        style={{
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {product.name}
      </h3>

      {/* Price */}
      <p className="text-sm font-bold text-amber-700 text-center -mt-1">
        ₹{product.price}
      </p>

      {/* Add to Cart button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-1.5 rounded text-xs font-bold transition-colors duration-200 ${
          isAdded
            ? 'bg-green-500 text-white'
            : 'bg-amber-600 hover:bg-amber-700 text-white'
        }`}
      >
        {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
