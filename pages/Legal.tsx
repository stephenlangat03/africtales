import React from 'react';

const Legal: React.FC<{ type: 'privacy' | 'terms' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
        <h1 className="text-3xl font-serif font-bold text-brand-900 mb-6">
          {type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <div className="prose prose-stone">
          {type === 'privacy' ? (
            <>
              <p>At Africtales, we are committed to protecting your privacy. This policy explains how we collect and use your information.</p>
              <h3>Information Collection</h3>
              <p>We collect information you provide directly to us when you create an account, make a purchase, or communicate with us.</p>
              <h3>Data Usage</h3>
              <p>We use your information to process transactions, send order confirmations, and improve our services.</p>
              <h3>Security</h3>
              <p>We implement appropriate security measures to protect your personal data against unauthorized access.</p>
            </>
          ) : (
            <>
              <p>Welcome to Africtales. By using our website, you agree to these terms.</p>
              <h3>Products</h3>
              <p>All our products are authentic and hand-crafted. Slight variations in color and size may occur due to the nature of handmade items.</p>
              <h3>Payments</h3>
              <p>We accept M-Pesa, Credit Cards, and PayPal. All payments are processed securely.</p>
              <h3>Shipping</h3>
              <p>We ship globally. Delivery times vary by location.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Legal;