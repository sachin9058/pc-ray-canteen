// app/admin/page.tsx

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.emailAddresses[0].emailAddress !== "luciferzx136@gmail.com") {
    redirect("/notAdmin");
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-lg mb-4">Welcome, Sachin Kumar 👑</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">📦 Manage Products</h2>
          <p>Add, edit or remove products</p>
        </Link>

        <Link
          href="/admin/orders"
          className="p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">🧾 View Orders</h2>
          <p>Track all incoming orders</p>
        </Link>

        <Link
          href="/admin/users"
          className="p-6 bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-2xl transition"
        >
          <h2 className="text-xl font-semibold mb-2">👤 User Management</h2>
          <p>See who’s using InstaFood</p>
        </Link>
      </div>
    </div>
  );
}
