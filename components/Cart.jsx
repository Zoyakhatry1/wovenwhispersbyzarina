'use client';

import { useState } from 'react';

export default function Cart({ isOpen, onClose, cart, updateQuantity, removeFromCart, getTotalPrice }) {
  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

  const handleInputChange = (e) => {
    setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    let message = `🛍️ *New Order Request*\n\n`;
    message += `*Customer Details:*\n`;
    message += `Name: ${customerDetails.name}\n`;
    message += `Phone: ${customerDetails.phone}\n`;
    message += `Address: ${customerDetails.address}, ${customerDetails.city} - ${customerDetails.pincode}\n\n`;
    message += `*Order Items:*\n`;
    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.emoji})\n`;
      message += `   Qty: ${item.quantity} × ₹${item.price} = ₹${item.quantity * item.price}\n`;
    });
    message += `\n*Total Amount: ₹${getTotalPrice()}*\n\n`;
    message += `Please share your UPI details for payment. Thank you! 💝`;
    return encodeURIComponent(message);
  };

  const handlePlaceOrder = () => {
    if (!customerDetails.name || !customerDetails.phone || !customerDetails.address) {
      alert('Please fill in all required details');
      return;
    }
    const whatsappNumber = '919876543210'; // Replace with actual number
    window.open(`https://wa.me/${whatsappNumber}?text=${generateWhatsAppMessage()}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay - no backdrop-blur (causes issues on mobile) */}
      <div className="fixed inset-0 bg-black/50 z-50" onClick={onClose} />

      {/* Sidebar - full width always on mobile */}
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 md:w-[480px] bg-white z-50 flex flex-col" style={{ maxWidth: '100vw' }}>
        
        {/* Header */}
        <div className="bg-amber-600 text-white px-3 py-3 sm:px-5 sm:py-4 flex justify-between items-center flex-shrink-0">
          <h2 className="text-sm sm:text-lg font-bold">🛒 Your Cart</h2>
          <button onClick={onClose} className="p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-3 sm:px-4 sm:py-4">

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-3">🧺</div>
              <p className="text-gray-500 text-sm">Your cart is empty</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.id} className="bg-amber-50 rounded-lg p-2 flex items-center gap-2 border border-amber-100">
                    <span className="text-2xl flex-shrink-0">{item.emoji}</span>
                    <div className="flex-1" style={{ minWidth: 0 }}>
                      <p className="font-bold text-slate-800 text-xs truncate">{item.name}</p>
                      <p className="text-amber-700 font-semibold text-xs">₹{item.price}</p>
                    </div>
                    {/* Qty */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="bg-white border border-amber-300 rounded-full w-6 h-6 flex items-center justify-center text-amber-700 font-bold text-xs">−</button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="bg-amber-600 rounded-full w-6 h-6 flex items-center justify-center text-white font-bold text-xs">+</button>
                    </div>
                    {/* Delete */}
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 flex-shrink-0 p-0.5">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>

              {/* Delivery Details */}
              <div className="bg-amber-50 rounded-lg p-3 mb-3 border border-amber-100">
                <h3 className="font-bold text-xs text-slate-800 mb-2">📋 Delivery Details</h3>
                <div className="space-y-2">
                  <input type="text" name="name" placeholder="Full Name *" value={customerDetails.name} onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-400 focus:outline-none text-xs sm:text-sm" />
                  <input type="tel" name="phone" placeholder="Phone Number *" value={customerDetails.phone} onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-400 focus:outline-none text-xs sm:text-sm" />
                  <textarea name="address" placeholder="Complete Address *" value={customerDetails.address} onChange={handleInputChange} rows="2"
                    className="w-full px-3 py-2 rounded-lg border border-amber-200 focus:border-amber-400 focus:outline-none resize-none text-xs sm:text-sm" />
                  <div className="flex gap-2">
                    <input type="text" name="city" placeholder="City *" value={customerDetails.city} onChange={handleInputChange}
                      className="flex-1" style={{ minWidth: 0 }} />
                    <input type="text" name="pincode" placeholder="Pincode *" value={customerDetails.pincode} onChange={handleInputChange}
                      className="flex-1" style={{ minWidth: 0 }} />
                  </div>
                  {/* Style city/pincode inputs uniformly */}
                  <style>{`
                    .delivery-row input {
                      padding: 8px 12px;
                      border-radius: 8px;
                      border: 1px solid #fcd34d;
                      font-size: 12px;
                      outline: none;
                      width: 100%;
                    }
                  `}</style>
                </div>
              </div>

              {/* Total */}
              <div className="bg-amber-600 rounded-lg p-3 text-white mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs sm:text-sm">Subtotal</span>
                  <span className="text-base sm:text-lg font-bold">₹{getTotalPrice()}</span>
                </div>
                {getTotalPrice() >= 999 ? (
                  <div className="bg-green-500/20 border border-green-300 rounded-lg p-2">
                    <p className="text-xs text-white font-semibold">🎉 You qualify for FREE shipping!</p>
                  </div>
                ) : (
                  <div className="bg-white/20 border border-white/30 rounded-lg p-2">
                    <p className="text-xs text-white">Add <span className="font-bold">₹{999 - getTotalPrice()}</span> more for FREE shipping 🚚</p>
                  </div>
                )}
                <p className="text-xs text-white/70 mt-1.5">💡 Shipping confirmed on WhatsApp</p>
              </div>

              {/* Trust */}
              <div className="bg-green-50 rounded-lg p-3 mb-3 border border-green-200">
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-base flex-shrink-0">🟢</span>
                  <div>
                    <p className="text-green-800 font-semibold text-xs">You'll be redirected to WhatsApp to confirm your order</p>
                    <p className="text-green-700 text-xs mt-0.5">All orders confirmed personally before payment.</p>
                  </div>
                </div>
                <div className="bg-white/60 rounded-lg p-2 border border-green-100">
                  <p className="text-slate-700 text-xs font-semibold mb-1.5">💬 Feel free to ask:</p>
                  <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                    <div><span className="text-green-600">✓</span> Change color?</div>
                    <div><span className="text-green-600">✓</span> When does it ship?</div>
                    <div><span className="text-green-600">✓</span> See another photo?</div>
                    <div><span className="text-green-600">✓</span> Customize size?</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <button onClick={handlePlaceOrder} className="w-full bg-green-500 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Confirm Order on WhatsApp
              </button>

              <p className="text-center text-slate-400 text-xs mt-2 px-2">
                Discuss details, confirm everything, then pay only when satisfied
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
