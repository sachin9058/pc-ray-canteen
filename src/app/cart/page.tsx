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
  }, [user, router]); // ✅ Always run but only executes when `user` is null

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
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
      <div className="flex-1">
        <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
          <p className="text-2xl md:text-3xl text-black">
            Your <span className="font-medium text-black">Cart</span>
          </p>
          <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
        </div>

        {cartProductList.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="text-left">
                <tr>
                  <th className="pb-6 md:px-4 px-1 text-gray-700 font-medium">Product</th>
                  <th className="pb-6 md:px-4 px-1 text-gray-700 font-medium">Price</th>
                  <th className="pb-6 md:px-4 px-1 text-gray-700 font-medium">Quantity</th>
                  <th className="pb-6 md:px-4 px-1 text-gray-700 font-medium">Subtotal</th>
                  <th className="pb-6 md:px-4 px-1 text-gray-700 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartProductList.map((product) => (
                  <tr key={product.name} className="border-t">
                    <td className="flex items-center gap-4 py-4">
                      <Image src={product.image} alt={product.name} width={100} height={100} className="rounded-md" />
                      <span className="text-lg">{product.name}</span>
                    </td>
                    <td className="py-4 md:px-4 px-1">
                    </td>
                    <td className="py-4 md:px-4 px-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] - 1)}
                          disabled={cartItems[product.name] === 1}
                          className="bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                        >
                          -
                        </button>
                        <span>{cartItems[product.name]}</span>
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] + 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4 md:px-4 px-1">
                      <button
                        onClick={() => removeFromCart(product.name)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        X
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
            className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
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
