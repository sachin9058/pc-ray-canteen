"use client"

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useAppContext } from "@/context/AppContext";

const Cart = ()=>{
    const { products, router, cartItems, addToCart, updateCartQuantity, getCartCount } = useAppContext()
    return <>
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-16 lg:px-32 pt-14 mb-20">
        <div className="flex-1">
            <div className="flex items-center justify-between mb-8 border-b border-gray-500/30 pb-6">
            <p className="text-2xl md:text-3xl text-black">
            Your <span className="font-medium text-black">Cart</span>
            </p>
            <p className="text-lg md:text-xl text-gray-500/80">{getCartCount()} Items</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto">
                    <thead className="text-left">
                    <tr>
                  <th className="text-nowrap pb-6 md:px-4 px-1 text-gray-50 font-medium">
                    Product Details
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-50 font-medium">
                    Price
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-50 font-medium">
                    Quantity
                  </th>
                  <th className="pb-6 md:px-4 px-1 text-gray-50 font-medium">
                    Subtotal
                  </th>
                </tr>
                    </thead>
                    <tbody>
                        
                    </tbody>
                </table>
            </div>

        </div>
    </div>
    
    </>
}

export default Cart