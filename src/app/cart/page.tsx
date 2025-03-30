"use client";

import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import OrderSummary from "@/components/OrdersData";
import Items from "@/components/Items";
import { useEffect } from "react";

const Cart = () => {
  const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount, getCartAmount, currency, removeFromCart } = useAppContext();

  const cartProductList = products.filter(product => cartItems[product.name]);
  useEffect(() => {
    console.log("cartItems:", cartItems);
  }, [cartItems]);
  useEffect(() => {
    console.log("Products:", products);
  }, [products]);


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
                      {currency}{((product?.offerPrice || 0) * (cartItems[product.name] || 0)).toFixed(2)}
                    </td>
                    <td className="py-4 md:px-4 px-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] - 1)}
                          disabled={cartItems[product.name] === 1}
                          className="bg-gray-200 px-2 py-1 rounded disabled:opacity-50"
                        >-
                        </button>
                        <span>{cartItems[product.name]}</span>
                        <button
                          onClick={() => updateCartQuantity(product.name, cartItems[product.name] + 1)}
                          className="bg-gray-200 px-2 py-1 rounded"
                        >+
                        </button>
                        {/* Delete Button */}
                        <button
                          onClick={() => removeFromCart(product.name)}
                          className="bg-white text-white px-1 py-1 rounded hover:bg-red-600"
                        >
                          <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#000000" height="20px" width="20px" version="1.1" id="Capa_1" viewBox="0 0 490 490" xmlSpace="preserve">
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
                          </svg>
                        </button>
                      </div>
                    </td>

                    <td className="py-4 md:px-4 px-1">{currency}{(product.price * cartItems[product.name]).toFixed(2)}</td>
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
            onClick={() => router.push("/checkout")}
            className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700"
          >
            Proceed to Checkout
          </button>
        )}
      </div>
      <OrderSummary />
    </div>
  );
};

export default Cart;
