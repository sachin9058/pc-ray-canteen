"use client";

import { useEffect, useState } from "react";

interface Order {
    _id: string;
    user: { name?: string; email?: string };
    items: { name: string; quantity: number }[];
    totalAmount: number;
    status: string;
    createdAt: string;
}

const AdminOrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch("/api/admin/orders");
                if (!res.ok) throw new Error("Failed to fetch orders");

                const data = await res.json();
                setOrders(data);
            } catch (error) {
                console.error("❌ Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Update order status
    const updateOrderStatus = async (id: string, status: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });

            if (!res.ok) throw new Error("Failed to update order");

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === id ? { ...order, status } : order
                )
            );
        } catch (error) {
            console.error("❌ Error updating order:", error);
        }
    };

    // Delete an order
    const deleteOrder = async (id: string) => {
        if (!confirm("Are you sure you want to delete this order?")) return;

        try {
            const res = await fetch(`/api/admin/orders/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Failed to delete order");

            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== id));
        } catch (error) {
            console.error("❌ Error deleting order:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Order Management
            </h1>

            {loading ? (
                <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    User
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Email
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Total
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order._id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                                       {order.user.name || "Unknown"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                                        {order.user?.email || "No Email"}
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                                        ₹{order.totalAmount}
                                    </td>
                                    <td className="px-4 py-2">
                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                updateOrderStatus(order._id, e.target.value)
                                            }
                                            className="border rounded px-2 py-1"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="processing">Processing</option>
                                            <option value="shipped">Shipped</option>
                                            <option value="delivered">Delivered</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button
                                            onClick={() => deleteOrder(order._id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminOrdersPage;
