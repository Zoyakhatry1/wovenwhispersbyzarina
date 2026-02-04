'use client';

import { useState } from 'react';

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Determine if product is on sale
  const isOnSale = product.original_price && product.sale_price && product.original_price > product.sale_price;
  
  // Use sale_price if on sale, otherwise use regular price
  const displayPrice = isOnSale ? product.sale_price : product.price;
  
  // Check if sold out
  const isSoldOut = product.sold_out;

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
        
        {/* Badge - Show "SOLD OUT" badge if sold out, otherwise show custom badge */}
        {isSoldOut ? (
          <div className="absolute top-1.5 left-1.5 bg-gray-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
            SOLD OUT
          </div>
        ) : product.badge && (
          <div className="absolute top-1.5 left-1.5 bg-amber-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
            {product.badge}
          </div>
        )}
        
        {/* Sale badge in top right if on sale and not sold out */}
        {!isSoldOut && isOnSale && (
          <div className="absolute top-1.5 right-1.5 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
            {Math.round(((product.original_price - product.sale_price) / product.original_price) * 100)}% OFF
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

      {/* Price - Show original price struck through if on sale */}
      <div className="text-center -mt-1">
        {isOnSale ? (
          <div className="flex items-center justify-center gap-2">
            <p className="text-xs text-gray-400 line-through">
              ₹{product.original_price}
            </p>
            <p className="text-sm font-bold text-red-600">
              ₹{displayPrice}
            </p>
          </div>
        ) : (
          <p className="text-sm font-bold text-amber-700">
            ₹{displayPrice}
          </p>
        )}
      </div>

      {/* Add to Cart button - Disabled if sold out */}
      <button
        onClick={handleAddToCart}
        disabled={isSoldOut}
        className={`w-full py-1.5 rounded text-xs font-bold transition-colors duration-200 ${
          isSoldOut
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : isAdded
            ? 'bg-green-500 text-white'
            : 'bg-amber-600 hover:bg-amber-700 text-white'
        }`}
      >
        {isSoldOut ? 'Sold Out' : isAdded ? '✓ Added to Cart' : 'Add to Cart'}
      </button>
    </div>
  );
}
