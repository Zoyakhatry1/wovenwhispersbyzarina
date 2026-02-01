'use client';

import { useState, useEffect } from 'react';

const banners = [
  {
    id: 1,
    bg: 'from-amber-100 to-yellow-50',
    emoji: '🧶',
    title: 'New Arrivals',
    subtitle: 'Fresh handcrafted pieces just added',
    cta: 'Shop Now',
  },
  {
    id: 2,
    bg: 'from-rose-100 to-pink-50',
    emoji: '💝',
    title: 'Custom Orders',
    subtitle: 'Your idea, made by hand with love',
    cta: 'Get Started',
  },
  {
    id: 3,
    bg: 'from-emerald-100 to-teal-50',
    emoji: '🚚',
    title: 'Free Shipping',
    subtitle: 'On all orders above ₹499',
    cta: 'Browse All',
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-amber-600 text-white text-center text-xs font-semibold py-1.5 px-3 tracking-wide">
        🚚 FREE SHIPPING ON ORDERS ABOVE ₹499/-
      </div>

      {/* Banner Carousel */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`min-w-full bg-gradient-to-r ${banner.bg} flex items-center justify-center px-5 py-8 sm:py-12`}
            >
              <div className="text-center max-w-md">
                <div className="text-5xl sm:text-6xl mb-2">{banner.emoji}</div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{banner.title}</h2>
                <p className="text-sm text-slate-500 mt-1 mb-3">{banner.subtitle}</p>
                <span className="inline-block bg-amber-600 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  {banner.cta} →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute bottom-2.5 left-0 right-0 flex justify-center gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === current ? 'bg-amber-600 w-5' : 'bg-amber-300'
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
