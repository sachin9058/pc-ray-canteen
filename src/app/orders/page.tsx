"use client";
import { useEffect, useState } from "react";
import { useAppContext } from "@/context/AppContext";

interface Order {
  _id: string;
  items: { name: string; price: number; quantity: number }[];
  totalAmount: number;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  createdAt: string;
}

const MyOrders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        setError("Error fetching orders");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const currentOrders = orders.filter(order => order.status !== "Delivered");
  const recentOrders = orders.filter(order => order.status === "Delivered");

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">My Orders</h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <>
         
          {currentOrders.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-medium text-gray-700 mb-4">Current Orders</h2>
              <div className="space-y-4">
                {currentOrders.map(order => (
                  <div key={order._id} className="p-4 border rounded-lg bg-white shadow">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium">
                        Order ID: <span className="text-gray-600">{order._id}</span>
                      </p>
                      <span className="text-sm px-3 py-1 rounded-full bg-yellow-100 text-yellow-600">
                        {order.status}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <p key={index}>
                          {item.name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-700 font-medium">
                        Total: {currency ?? ""}{order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          
          {recentOrders.length > 0 && (
            <div>
              <h2 className="text-xl font-medium text-gray-700 mb-4">Recent Orders</h2>
              <div className="space-y-4">
                {recentOrders.map(order => (
                  <div key={order._id} className="p-4 border rounded-lg bg-gray-100 shadow">
                    <div className="flex justify-between items-center">
                      <p className="text-gray-700 font-medium">
                        Order ID: <span className="text-gray-600">{order._id}</span>
                      </p>
                      <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-600">
                        Delivered
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {order.items.map((item, index) => (
                        <p key={index}>
                          {item.name} × {item.quantity}
                        </p>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-gray-700 font-medium">
                        Total: {currency ?? ""}{order.totalAmount.toFixed(2)}
                      </p>
                      <p className="text-gray-500 text-sm">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MyOrders;
