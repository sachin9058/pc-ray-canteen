'use client';

import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';

const Checkout = () => {
  const { cartItems, products, getCartAmount, currency, clearCart } = useAppContext();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      router.push('/');
    }
  }, [cartItems, router]);
  const shippingFee = 15

  const cartProductList = products.filter((product) => cartItems[product.name]);
  const totalAmount = getCartAmount() +  Math.floor((getCartAmount() ?? 0) * 0.02) + shippingFee + parseFloat(((getCartAmount() ?? 0) * 0.02).toFixed(2));

  const placeOrder = async () => {
    if (!user) {
      alert("You need to be logged in to place an order.");
      return;
    }
  
    const cartArray = Object.entries(cartItems)
      .map(([name, quantity]) => {
        const product = products.find((p) => p.name === name);
        return product ? { name, price: product.price, quantity } : null;
      })
      .filter(Boolean);
  
    if (cartArray.length === 0) {
      alert("Your cart is empty!");
      return;
    }
  
    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          cartItems: cartArray,
          totalAmount: getCartAmount(),
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("✅ Order Placed:", data);
        alert("Order placed successfully!");
  
        localStorage.setItem("lastOrder", JSON.stringify({
          cartItems: cartArray,
          totalAmount: getCartAmount(),
          currency,
        }));
  
        clearCart(); 
  
        router.push('/thank-you');
      } else {
        console.error("❌ Order Failed:", data.error);
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("❌ Order Error:", error);
      alert("Something went wrong!");
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h2 className="text-3xl font-semibold text-center mb-6">Checkout</h2>

        <div className="space-y-4">
          {cartProductList.map((product) => (
            <div key={product.name} className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-4">
                <Image src={product.image} alt={product.name} width={60} height={60} className="rounded" />
                <div>
                  <p className="text-lg font-medium">{product.name}</p>
                  <p className="text-gray-600">Quantity: {cartItems[product.name]}</p>
                </div>
              </div>
              <p className="text-lg font-medium">{currency}{(product.price * cartItems[product.name]).toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4 text-right">
          <p className="text-xl font-semibold">Total (Including Shipping and Taxes): {currency}{totalAmount.toFixed(2)}</p>
        </div>

        <button
          className="w-full bg-orange-600 text-white py-3 mt-6 rounded-lg hover:bg-orange-700 transition"
          onClick={async () => {
            await placeOrder();
            router.push('/thank-you')
          }}
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
