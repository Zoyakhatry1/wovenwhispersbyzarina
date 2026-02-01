'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Cart from '@/components/Cart';
import Hero from '@/components/Hero';
import { products as defaultProducts } from '@/data/products';

export default function Home() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const productsPerPage = 8;

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      // Try to fetch from API first
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        // Fallback to default products if API fails
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error('Error loading products:', error);
      setProducts(defaultProducts);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(products.length / productsPerPage);
  const indexOfFirst = (currentPage - 1) * productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfFirst + productsPerPage);

  const paginate = (n) => {
    setCurrentPage(n);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  // Cart
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === product.id);
      if (exists) return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, qty) => {
    if (qty === 0) setCart((prev) => prev.filter((i) => i.id !== id));
    else setCart((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const getTotalItems = () => cart.reduce((t, i) => t + i.quantity, 0);
  const getTotalPrice = () => cart.reduce((t, i) => t + i.price * i.quantity, 0);

  return (
    <div className="min-h-screen bg-stone-50" style={{ overflowX: 'hidden' }}>

      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-40 bg-white border-b border-amber-200 shadow-sm">
        <div className="flex justify-between items-center px-3 py-2 sm:px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.jpg" alt="WovenWhispers" className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-amber-200" />
            <div>
              <p className="text-xs sm:text-sm font-bold text-amber-800 leading-tight">WovenWhispers</p>
              <p className="text-xs text-slate-400 leading-none">by Zarina</p>
            </div>
          </div>
          <button onClick={() => setIsCartOpen(true)} className="relative bg-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5">
            🛒 Cart
            {getTotalItems() > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-teal-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* ─── HERO: announcement bar + banner carousel ─── */}
      <Hero />

      {/* ─── FEATURED PRODUCTS ─── */}
      <main className="px-3 sm:px-4 py-4 sm:py-6">
        {/* Title */}
        <div className="mb-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-800">All Products</h2>
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-2 animate-pulse">🧶</div>
            <p className="text-slate-400 text-sm">Loading products...</p>
          </div>
        ) : (
          <>
            {/* Product Grid — 2 cols mobile, 3 cols lg */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3 lg:gap-4 max-w-5xl mx-auto">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
              ))}
            </div>
          </>
        )}

        {/* Empty state */}
        {currentProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-2">🧶</div>
            <p className="text-slate-400 text-sm">No products available yet.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-5">
            <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}
              className={`w-8 h-8 rounded text-sm font-bold flex items-center justify-center ${currentPage === 1 ? 'bg-gray-100 text-gray-300' : 'bg-white border border-amber-300 text-amber-700'}`}>←</button>
            {[...Array(totalPages)].map((_, i) => (
              <button key={i + 1} onClick={() => paginate(i + 1)}
                className={`w-8 h-8 rounded text-sm font-bold ${currentPage === i + 1 ? 'bg-amber-600 text-white' : 'bg-white border border-amber-200 text-amber-700'}`}>{i + 1}</button>
            ))}
            <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}
              className={`w-8 h-8 rounded text-sm font-bold flex items-center justify-center ${currentPage === totalPages ? 'bg-gray-100 text-gray-300' : 'bg-white border border-amber-300 text-amber-700'}`}>→</button>
          </div>
        )}
      </main>

      {/* ─── WHATSAPP TRUST LINE ─── */}
      <div className="px-3 sm:px-4 pt-4 pb-1">
        <div className="max-w-5xl mx-auto flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
          <span className="text-sm">🟢</span>
          <p className="text-xs text-green-800 font-semibold text-center">Every order confirmed personally via WhatsApp before payment</p>
        </div>
      </div>

      {/* ─── MEET ZARINA ─── (original text preserved exactly) */}
      <section className="bg-amber-50 py-6 sm:py-10 px-3 sm:px-4 border-t border-amber-100">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-3 sm:mb-5">
            <span className="inline-block bg-white px-3 py-1 rounded-full border border-amber-200 text-amber-700 text-xs font-bold mb-2">✨ MEET ZARINA</span>
            <h3 className="text-lg sm:text-2xl font-bold text-slate-800">
              Every Stitch Has a <span className="text-amber-700">Story</span>
            </h3>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 border border-amber-100 shadow-sm">
            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3">
              <p>For over <strong className="text-amber-700">25 years</strong>, I've been creating magic with yarn and a crochet hook. What started as a hobby became my sanctuary, my meditation, my joy.</p>
              <div className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
                <p className="italic text-slate-600">"People always asked, <em>'Where can I buy one?'</em> In November 2025, I finally took the leap and started <strong>WovenWhispersbyZarina</strong>."</p>
              </div>
              <p>Every piece carries the same dedication and care. Now I get to share these creations of comfort and joy with you! ❤️</p>
            </div>
            {/* Badges */}
            <div className="flex gap-1.5 mt-4 pt-3 border-t border-amber-100">
              <div className="flex-1 text-center bg-green-50 rounded-lg p-2 border border-green-200">
                <p className="text-lg">💚</p>
                <p className="text-xs font-bold text-slate-800">Handmade</p>
              </div>
              <div className="flex-1 text-center bg-blue-50 rounded-lg p-2 border border-blue-200">
                <p className="text-lg">🎯</p>
                <p className="text-xs font-bold text-slate-800">Custom</p>
              </div>
              <div className="flex-1 text-center bg-amber-50 rounded-lg p-2 border border-amber-200">
                <p className="text-lg">⭐</p>
                <p className="text-xs font-bold text-slate-800">25+ Yrs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── HAVE QUESTIONS? (original text preserved exactly) ─── */}
      <section className="mt-5 sm:mt-8 px-3 sm:px-4 pb-6">
        <div className="bg-green-50 rounded-xl p-3 sm:p-4 border border-green-200 max-w-lg mx-auto">
          <p className="text-xs sm:text-sm font-bold text-slate-800 text-center">💬 Have Questions?</p>
          <p className="text-xs text-slate-500 text-center mt-0.5 mb-2.5">🟢 Every order confirmed personally via WhatsApp</p>
          <div className="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
            <div className="bg-white rounded-lg p-1.5"><span className="text-green-600 font-bold">✓</span> Different color?</div>
            <div className="bg-white rounded-lg p-1.5"><span className="text-green-600 font-bold">✓</span> Custom size?</div>
            <div className="bg-white rounded-lg p-1.5"><span className="text-green-600 font-bold">✓</span> More photos?</div>
            <div className="bg-white rounded-lg p-1.5"><span className="text-green-600 font-bold">✓</span> Special request?</div>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-slate-800 text-white py-5 px-3 text-center">
        <p className="text-sm font-semibold">WovenWhispersbyZarina</p>
        <p className="text-gray-400 text-xs mt-1">Handcrafted Crochet • Est. 2000</p>
        <p className="text-gray-500 text-xs mt-1">WhatsApp us for custom orders!</p>
      </footer>

      {/* ─── CART DRAWER (untouched) ─── */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        getTotalPrice={getTotalPrice}
      />
    </div>
  );
}
