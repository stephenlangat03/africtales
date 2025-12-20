import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CATEGORIES } from '../constants';
import Button from '../components/Button';
import { Product, Order } from '../types';

const Admin: React.FC = () => {
  const { user, products, orders, addProduct, updateOrderStatus } = useStore();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'Beadwork',
    image: '',
    rating: 5,
    stock: 1,
    history: ''
  });

  // Use stored orders.
  const allOrders = orders;

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [user, navigate]);

  // Data for chart
  const salesData = [
    { name: 'Jan', sales: 40000 },
    { name: 'Feb', sales: 30000 },
    { name: 'Mar', sales: 20000 },
    { name: 'Apr', sales: 27800 },
    { name: 'May', sales: 18900 },
    { name: 'Jun', sales: 23900 },
    { name: 'Current', sales: allOrders.reduce((acc, curr) => acc + curr.total, 0) },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      const productToAdd: Product = {
        id: Date.now().toString(),
        name: newProduct.name,
        description: newProduct.description || '',
        price: newProduct.price || 0,
        category: newProduct.category || 'Beadwork',
        image: newProduct.image || 'https://picsum.photos/400/400', // Use uploaded image or default placeholder
        rating: 5,
        stock: newProduct.stock || 0,
        history: newProduct.history
      };
      
      addProduct(productToAdd);
      setIsModalOpen(false);
      // Reset form
      setNewProduct({
        name: '',
        description: '',
        price: 0,
        category: 'Beadwork',
        image: '',
        rating: 5,
        stock: 1,
        history: ''
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-brand-900">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
           <span className="px-3 py-1 bg-brand-100 text-brand-800 rounded-full text-sm font-bold">Admin: {user.name}</span>
           <Button onClick={() => setIsModalOpen(true)}>+ Add Product</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Revenue</h3>
          <p className="text-3xl font-bold text-brand-900 mt-2">KES {salesData.reduce((a,b)=>a+b.sales, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Total Orders</h3>
          <p className="text-3xl font-bold text-brand-900 mt-2">{allOrders.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-gray-500 text-sm font-medium uppercase">Products</h3>
          <p className="text-3xl font-bold text-brand-900 mt-2">{products.length}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Sales Overview</h3>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `KES ${Number(value).toLocaleString()}`} />
              <Bar dataKey="sales" fill="#a67c52" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h3 className="font-bold text-gray-900">Manage Orders</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">ID / Date</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {allOrders.length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-4 text-center text-gray-500">No active orders found.</td></tr>
                ) : (
                  allOrders.map((order) => (
                    <tr key={order.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{order.id}</div>
                        <div className="text-xs text-gray-500">{order.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        {order.userId}
                      </td>
                      <td className="px-6 py-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`block w-full px-2 py-1 rounded text-xs font-bold border-0 ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-brand-500 cursor-pointer ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Received</option>
                          <option value="processing">Dispatched</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        {order.feedback ? (
                           <div className="flex flex-col">
                             <span className="text-yellow-500 text-xs">{'★'.repeat(order.feedback.rating)}</span>
                             <span className="text-xs text-gray-500 truncate w-24" title={order.feedback.comment}>{order.feedback.comment}</span>
                           </div>
                        ) : <span className="text-gray-300">-</span>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Inventory */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Inventory Status</h3>
          </div>
          <div className="overflow-x-auto">
             <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Price</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-xs">{p.name}</td>
                    <td className={`px-6 py-4 font-bold ${p.stock < 5 ? 'text-red-600' : 'text-green-600'}`}>{p.stock}</td>
                    <td className="px-6 py-4">KES {p.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>

            {/* Modal panel */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
              <form onSubmit={handleAddProduct}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Add New Product</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Product Name</label>
                      <input type="text" name="name" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.name} onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price (KES)</label>
                        <input type="number" name="price" required min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.price} onChange={handleInputChange} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Stock</label>
                        <input type="number" name="stock" required min="0" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.stock} onChange={handleInputChange} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select name="category" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.category} onChange={handleInputChange}>
                        {CATEGORIES.filter(c => c !== "All").map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Product Image</label>
                      <div className="mt-1 flex items-center gap-4">
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleImageUpload} 
                          className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-brand-50 file:text-brand-700
                            hover:file:bg-brand-100"
                        />
                        {newProduct.image && (
                          <div className="flex-shrink-0">
                            <img src={newProduct.image} alt="Preview" className="h-16 w-16 object-cover rounded-md border border-gray-200" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea name="description" rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.description} onChange={handleInputChange}></textarea>
                    </div>
                     <div>
                      <label className="block text-sm font-medium text-gray-700">History / Cultural Context (for AI)</label>
                      <textarea name="history" rows={2} placeholder="E.g. Used by the Maasai for wedding ceremonies..." className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" value={newProduct.history} onChange={handleInputChange}></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button type="submit" className="w-full sm:ml-3 sm:w-auto">Save Product</Button>
                  <Button type="button" variant="outline" className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;