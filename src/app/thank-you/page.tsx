'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

const ThankYou = () => {
  const [orderDetails, setOrderDetails] = useState<{ cartItems: OrderItem[]; totalAmount: number; currency: string } | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const orderData = localStorage.getItem("lastOrder");

    if (orderData) {
      setOrderDetails(JSON.parse(orderData));
    } else {
      setRedirecting(true);
      setTimeout(() => {
        router.push('/');
      }, 10);
    }
  }, [router]);

  if (redirecting) {
    return (
      <div className="text-center mt-10 text-lg">
        <p>No recent order found.</p>
        <p>Redirecting to home in 10 seconds...</p>
      </div>
    );
  }

  if (!orderDetails) {
    return <p className="text-center mt-10 text-lg">Loading order details...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Thank You for Your Order!</h2>
        
        <div className="space-y-4">
          {orderDetails.cartItems.map((product) => (
            <div key={product.name} className="flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-lg font-medium">{product.name}</p>
                <p className="text-gray-600">Quantity: {product.quantity}</p>
              </div>
              <p className="text-lg font-medium">{orderDetails.currency}{(product.price * product.quantity).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4 text-right">
          <p className="text-xl font-semibold">
            Total(Including Shipping and Tax charges): {orderDetails.currency}{orderDetails.totalAmount.toFixed(2)}
          </p>
        </div>

        <p className="text-center text-gray-600 mt-4"></p>
      </div>
    </div>
  );
};

export default ThankYou;
