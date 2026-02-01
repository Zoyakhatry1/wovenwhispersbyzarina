'use client';

import { useState, useEffect } from 'react';

export default function ProductManager() {
  const [products, setProducts] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    badge: '',
    image: ''
  });

  // Load products from API on mount
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveToDatabase = async () => {
    try {
      setSaving(true);
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(products),
      });

      if (response.ok) {
        alert('✅ Products saved successfully! Changes are now live for everyone.');
      } else {
        const error = await response.json();
        if (error.error === 'Database not configured') {
          localStorage.setItem('crochetProducts', JSON.stringify(products));
          alert('⚠️ Database not configured. Saved to browser only.\n\nTo enable database: Add Supabase credentials in Vercel environment variables.');
        } else {
          throw new Error(error.error || 'Failed to save');
        }
      }
    } catch (error) {
      console.error('Save error:', error);
      localStorage.setItem('crochetProducts', JSON.stringify(products));
      alert('⚠️ Could not save to database. Saved to browser only.\n\nError: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingProduct) {
      // Update existing product
      setProducts(prev => prev.map(p => 
        p.id === editingProduct.id 
          ? { ...formData, id: editingProduct.id, price: Number(formData.price) }
          : p
      ));
      setEditingProduct(null);
    } else {
      // Add new product
      const newProduct = {
        ...formData,
        id: Date.now(), // Simple ID generation
        price: Number(formData.price)
      };
      setProducts(prev => [...prev, newProduct]);
      setIsAddingNew(false);
    }

    // Reset form
    setFormData({
      name: '',
      price: '',
      badge: '',
      image: ''
    });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      badge: product.badge || '',
      image: product.image || ''
    });
    setIsAddingNew(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleCancel = () => {
    setIsAddingNew(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      price: '',
      badge: '',
      image: ''
    });
  };

  const emojiOptions = ['🎁', '👶', '🧸', '🌸', '🧣', '🛋️', '💐', '☕', '🐕', '🎀', '🧶', '💝', '🌺', '🦋', '🌈'];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Save to Database Button */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={saveToDatabase}
          disabled={saving}
          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <span className="animate-spin">⏳</span> Saving...
            </>
          ) : (
            <>
              <span className="text-xl">💾</span> Save All Changes to Database
            </>
          )}
        </button>
        
        <button
          onClick={loadProducts}
          disabled={loading}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
        >
          <span className="text-xl">🔄</span> Refresh
        </button>
      </div>

      {/* Add New Product Button */}
      {!isAddingNew && (
        <div className="mb-8">
          <button
            onClick={() => setIsAddingNew(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
          >
            <span className="text-xl">+</span> Add New Product
          </button>
        </div>
      )}

      {/* Add/Edit Product Form */}
      {isAddingNew && (
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border-2 border-amber-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            {editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                  placeholder="e.g., Cozy Baby Blanket"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                  placeholder="e.g., 500"
                  min="0"
                  required
                />
              </div>
            </div>


            <div className="grid md:grid-cols-2 gap-6">

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Badge (Optional)
                </label>
                <select
                  name="badge"
                  value={formData.badge}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                >
                  <option value="">None</option>
                  <option value="New">New</option>
                  <option value="Popular">Popular</option>
                  <option value="Sale">Sale</option>
                  <option value="Limited">Limited</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Image URL (Optional)
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-rose-200 focus:border-rose-400 focus:outline-none transition-all"
                placeholder="e.g., /images/blanket.jpg or https://..."
              />
              <p className="text-xs text-gray-500 mt-2">
                Leave empty to use emoji. For images, upload to /public/images/ folder first.
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {editingProduct ? 'Update Product' : 'Add Product'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-rose-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          📦 All Products ({products.length})
        </h2>

        {loading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pulse">🧶</div>
            <p className="text-gray-500 text-lg">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No products yet. Add your first product!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-2xl p-6 border-2 border-rose-100 hover:border-rose-300 transition-all"
              >
                <div className="flex items-start gap-4">
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {product.name}
                          {product.badge && (
                            <span className="ml-3 text-xs bg-amber-400 text-white px-3 py-1 rounded-full font-semibold">
                              {product.badge}
                            </span>
                          )}
                        </h3>
                        <p className="text-2xl font-bold text-rose-600 mt-1">₹{product.price}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-sm"
                        >
                          ✏️ Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-semibold transition-all text-sm"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
