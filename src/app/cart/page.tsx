"use client";

import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import OrderSummary from "@/components/OrdersData";
import { useUser } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

const Cart = () => {
  const { products, router, cartItems, updateCartQuantity, getCartCount, getCartAmount, currency, removeFromCart } = useAppContext();
  const { user } = useUser();
  const alertShown = useRef(false);

  useEffect(() => {
    if (!user && !alertShown.current) {
      alertShown.current = true;
      alert("Please Login First");
      router.push("/");
    }
  }, [user, router]);

  useEffect(() => {
    console.log("cartItems:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    console.log("Products:", products);
  }, [products]);

  if (!user) {
    return null;
  }

  const cartProductList = products.filter((product) => cartItems[product.name]);

  return (
    <div className="flex flex-col md:flex-row gap-10 px-4 md:px-16 lg:px-32 pt-14 mb-20 min-h-screen">
      <div className="flex-1 bg-white p-6 shadow-lg rounded-lg">
        <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-4">
          <p className="text-xl md:text-2xl font-semibold text-gray-900">
            Your <span className="font-bold text-orange-500">Cart</span>
          </p>
          <p className="text-sm md:text-lg text-gray-600">{getCartCount()} Items</p>
        </div>

        {cartProductList.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto text-sm md:text-base">
              <thead className="text-left">
                <tr className="border-b border-gray-300">
                  <th className="py-3 px-2 md:px-4 text-gray-700">Product</th>
                  <th className="py-3 px-2 md:px-4 text-gray-700">Quantity</th>
                  <th className="py-3 px-2 md:px-4 text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartProductList.map((product) => (
                  <tr key={product.name} className="border-t text-gray-800">
                    <td className="flex items-center gap-4 py-4 px-2 md:px-4">
                      <Image src={product.image} alt={product.name} width={80} height={80} className="rounded-md" />
                      <span className="text-sm md:text-lg font-medium">{product.name}</span>
                    </td>
                    <td className="py-4 px-2 md:px-4">
                      <div className="flex items-center justify-center gap-3 border border-gray-300 rounded-md p-2">
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] - 1)}
                          disabled={cartItems[product.name] === 1}
                          className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50 text-xl"
                        >
                          -
                        </button>
                        <span className="text-lg font-semibold">{cartItems[product.name]}</span>
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] + 1)}
                          className="bg-gray-200 px-3 py-1 rounded text-xl"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-2 md:px-4">
                      <button
                        onClick={() => removeFromCart(product.name)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm md:text-base"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 text-right text-lg font-medium">
          <p>Total: {currency}{getCartAmount().toFixed(2)}</p>
        </div>

        {cartProductList.length > 0 && (
          <button
            onClick={() => router.push('/checkout')}
            className="w-full bg-orange-600 text-white py-3 mt-5 rounded-md hover:bg-orange-700 text-lg font-semibold"
          >
            Place Order
          </button>
        )}
      </div>
      <OrderSummary />
    </div>
  );
};

export default Cart;
