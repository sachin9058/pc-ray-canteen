"use client"
import { UserType } from "@/types/user";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

const AdminUSerPage = () => {
    const { user, isSignedIn } = useUser();
    const router = useRouter();
    const [users, setusers] = useState<UserType[]>([])
    const [loading, setLoading] = useState(true)


    const adminEmails = ["luciferzx136@gmail.com"]; // Add your admin emails

    useEffect(() => {
        if (!isSignedIn || !adminEmails.includes(user?.emailAddresses[0]?.emailAddress)) {
            router.push("/");
            return;
        }
    }
    )


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("/api/admin/users")
                const data = await res.json()
                setusers(data)
            } catch (error) {
                console.error("Error Fetching Users", error)
            } finally {
                setLoading(false)
            }
        }
        fetchUsers()
    }, [isSignedIn,user,router])

    if (!isSignedIn || !adminEmails.includes(user?.emailAddresses[0]?.emailAddress)) {
        return <p className="text-center mt-10 text-red-500">Access Denied</p>;
      }
    

    return (
        <div className="p-6 bg-gray-100 min-h-screen dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">User Management</h1>

            {loading ? (
                <p className="text-gray-500">Loading users...</p>
            ) : users.length === 0 ? (
                <p className="text-gray-500">No users found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-gray-200 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Clerk ID</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-200">Joined</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} className="border-b dark:border-gray-700">
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.name}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.email}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{user.clerkId}</td>
                                    <td className="px-4 py-2 text-gray-800 dark:text-gray-100">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminUSerPage