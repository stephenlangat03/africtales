import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';
import { Order } from '../types';

const Checkout: React.FC = () => {
  const { cart, cartTotal, placeOrder, user } = useStore();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'card' | 'paypal'>('mpesa');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: user?.email || '',
      address: '',
      city: '',
      phone: ''
  });

  if (cart.length === 0) {
      navigate('/cart');
      return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate API call
    setTimeout(() => {
        const newOrder: Order = {
            id: `ORD-${Date.now().toString().substr(-6)}`,
            userId: user?.id || 'guest',
            items: [...cart],
            total: cartTotal,
            status: 'pending',
            date: new Date().toISOString().split('T')[0],
            paymentMethod
        };
        placeOrder(newOrder);
        setIsProcessing(false);
        setStep(3); // Success step
    }, 2000);
  };

  if (step === 3) {
      return (
          <div className="max-w-3xl mx-auto px-4 py-16 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 mb-8">Thank you for your purchase. We have sent a confirmation email to {formData.email}.</p>
              <Button onClick={() => navigate('/shop')}>Continue Shopping</Button>
          </div>
      );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-serif font-bold text-brand-900 mb-8 text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left: Form */}
        <div>
           <form onSubmit={handlePlaceOrder} className="space-y-6">
             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">1. Shipping Details</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input required type="text" name="firstName" placeholder="First Name" className="p-2 border rounded" onChange={handleInputChange} value={formData.firstName} />
                    <input required type="text" name="lastName" placeholder="Last Name" className="p-2 border rounded" onChange={handleInputChange} value={formData.lastName} />
                    <input required type="email" name="email" placeholder="Email" className="col-span-2 p-2 border rounded" onChange={handleInputChange} value={formData.email} />
                    <input required type="text" name="address" placeholder="Address" className="col-span-2 p-2 border rounded" onChange={handleInputChange} value={formData.address} />
                    <input required type="text" name="city" placeholder="City" className="p-2 border rounded" onChange={handleInputChange} value={formData.city} />
                    <input required type="tel" name="phone" placeholder="Phone (e.g., 0722000000)" className="p-2 border rounded" onChange={handleInputChange} value={formData.phone} />
                </div>
             </div>

             <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold mb-4 border-b pb-2">2. Payment Method</h2>
                <div className="space-y-3">
                    <label className={`flex items-center p-4 border rounded cursor-pointer ${paymentMethod === 'mpesa' ? 'border-green-500 bg-green-50' : ''}`}>
                        <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={() => setPaymentMethod('mpesa')} className="mr-3" />
                        <div>
                            <span className="font-bold block">M-Pesa</span>
                            <span className="text-xs text-gray-500">Pay directly from your phone</span>
                        </div>
                    </label>
                    <label className={`flex items-center p-4 border rounded cursor-pointer ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}>
                        <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="mr-3" />
                        <div>
                            <span className="font-bold block">Credit / Debit Card</span>
                            <span className="text-xs text-gray-500">Visa, Mastercard</span>
                        </div>
                    </label>
                    <label className={`flex items-center p-4 border rounded cursor-pointer ${paymentMethod === 'paypal' ? 'border-indigo-500 bg-indigo-50' : ''}`}>
                        <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="mr-3" />
                        <div>
                            <span className="font-bold block">PayPal</span>
                        </div>
                    </label>
                </div>
             </div>

             <Button 
                type="submit" 
                className="w-full" 
                disabled={isProcessing}
                size="lg"
             >
                 {isProcessing ? 'Processing Payment...' : `Pay KES ${cartTotal.toLocaleString()}`}
             </Button>
           </form>
        </div>

        {/* Right: Summary */}
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
            <h3 className="text-lg font-bold mb-4">Order Summary</h3>
            <div className="space-y-4 mb-4">
                {cart.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                ))}
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>KES {cartTotal.toLocaleString()}</span>
            </div>
            <div className="mt-6 text-xs text-gray-500">
                <p>🔒 Secure checkout powered by M-Pesa & Stripe (Simulation).</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;