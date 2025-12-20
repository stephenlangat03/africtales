
import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Navigate, Link } from 'react-router-dom';
import Button from '../components/Button';
import { Feedback } from '../types';

const Orders: React.FC = () => {
  const { user, orders, addOrderFeedback } = useStore();
  const [feedbackFormOpenId, setFeedbackFormOpenId] = useState<string | null>(null);
  const [newFeedback, setNewFeedback] = useState<Partial<Feedback>>({ rating: 5, comment: '' });

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://placehold.co/100x100/eaddd7/8c6239?text=Item';
    e.currentTarget.onerror = null;
  };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const myOrders = orders.filter(o => o.userId === user.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const getStatusStep = (status: string) => {
    switch(status) {
      case 'pending': return 1;
      case 'processing': return 2;
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 1;
    }
  };

  const handleFeedbackSubmit = (orderId: string, e: React.FormEvent) => {
    e.preventDefault();
    if (newFeedback.comment) {
      addOrderFeedback(orderId, {
        rating: newFeedback.rating || 5,
        comment: newFeedback.comment,
        date: new Date().toISOString().split('T')[0]
      });
      setFeedbackFormOpenId(null);
      setNewFeedback({ rating: 5, comment: '' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-brand-900 mb-8">My Orders</h1>
      
      {myOrders.length === 0 ? (
        <div className="text-center py-20 bg-brand-50 rounded-xl border border-dashed border-brand-200">
          <p className="text-xl text-brand-800 mb-4">You haven't placed any orders yet.</p>
          <Link to="/shop">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {myOrders.map(order => {
            const currentStep = getStatusStep(order.status);
            return (
              <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                {/* Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Order ID</span>
                    <p className="font-mono text-gray-900 font-medium">{order.id}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Date Placed</span>
                    <p className="text-gray-900">{order.date}</p>
                  </div>
                   <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Amount</span>
                    <p className="text-brand-800 font-bold">KES {order.total.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress Tracker */}
                <div className="px-6 py-8">
                  <div className="relative">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                      <div 
                        style={{ width: `${(currentStep / 4) * 100}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-500 transition-all duration-500"
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm font-medium text-gray-600">
                      <div className={`text-center ${currentStep >= 1 ? 'text-brand-700 font-bold' : ''}`}>Received</div>
                      <div className={`text-center ${currentStep >= 2 ? 'text-brand-700 font-bold' : ''}`}>Dispatched</div>
                      <div className={`text-center ${currentStep >= 3 ? 'text-brand-700 font-bold' : ''}`}>Shipped</div>
                      <div className={`text-center ${currentStep >= 4 ? 'text-green-600 font-bold' : ''}`}>Delivered</div>
                    </div>
                  </div>
                </div>

                {/* Items */}
                <div className="px-6 pb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Items Ordered</h4>
                  <ul className="divide-y divide-gray-100">
                    {order.items.map(item => (
                      <li key={item.id} className="py-2 flex items-center justify-between">
                         <div className="flex items-center">
                            <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-10 h-10 object-cover rounded mr-3" 
                                onError={handleImageError}
                            />
                            <div>
                              <p className="text-sm text-gray-800">{item.name}</p>
                              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                            </div>
                         </div>
                         <p className="text-sm text-gray-600">KES {(item.price * item.quantity).toLocaleString()}</p>
                      </li>
                    ))}
                  </ul>

                  {/* Feedback Section */}
                  {order.status === 'delivered' && (
                    <div className="mt-6 border-t border-gray-100 pt-4">
                      {order.feedback ? (
                         <div className="bg-green-50 p-4 rounded-lg">
                           <div className="flex items-center mb-1">
                             <span className="font-bold text-green-800 text-sm mr-2">Your Feedback:</span>
                             <div className="flex text-yellow-500 text-xs">{'★'.repeat(order.feedback.rating)}</div>
                           </div>
                           <p className="text-sm text-green-900 italic">"{order.feedback.comment}"</p>
                         </div>
                      ) : (
                        <div>
                          {!feedbackFormOpenId ? (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => setFeedbackFormOpenId(order.id)}
                            >
                              Leave Feedback
                            </Button>
                          ) : feedbackFormOpenId === order.id && (
                            <form onSubmit={(e) => handleFeedbackSubmit(order.id, e)} className="bg-gray-50 p-4 rounded-lg">
                               <h4 className="text-sm font-bold text-gray-900 mb-2">Rate your experience</h4>
                               <div className="mb-3">
                                 <label className="block text-xs font-medium text-gray-700 mb-1">Rating</label>
                                 <select 
                                   className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2"
                                   value={newFeedback.rating}
                                   onChange={e => setNewFeedback({...newFeedback, rating: Number(e.target.value)})}
                                 >
                                   <option value="5">5 - Excellent</option>
                                   <option value="4">4 - Good</option>
                                   <option value="3">3 - Average</option>
                                   <option value="2">2 - Poor</option>
                                   <option value="1">1 - Terrible</option>
                                 </select>
                               </div>
                               <div className="mb-3">
                                 <label className="block text-xs font-medium text-gray-700 mb-1">Comment</label>
                                 <textarea 
                                    className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2" 
                                    rows={2} 
                                    placeholder="How was the product?"
                                    value={newFeedback.comment}
                                    onChange={e => setNewFeedback({...newFeedback, comment: e.target.value})}
                                    required
                                 ></textarea>
                               </div>
                               <div className="flex gap-2">
                                 <Button type="submit" size="sm">Submit Review</Button>
                                 <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => setFeedbackFormOpenId(null)}
                                 >Cancel</Button>
                               </div>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Orders;
