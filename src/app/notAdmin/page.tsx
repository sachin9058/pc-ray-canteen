"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const NotAdminPage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to homepage after 5 seconds
        const timeout = setTimeout(() => {
            router.push("/");
        }, 5000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center p-6">
            <h1 className="text-4xl font-bold text-red-500">🚫 Access Denied!</h1>
            <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
                Whoops! It looks like you{"'"}re trying to access the Admin Panel... 
            </p>
            <p className="mt-2 text-md text-gray-600 dark:text-gray-400">
                But guess what? You don{"'"}t have the **magic powers** to be here! 🧙‍♂️✨
            </p>
            
            <Image
                src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzdqYjdmYXhlYndyOTVyNndxOHh2Ymdvd2NmbzUwMXY5eGkxZXl1eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Ju7l5y9osyymQ/giphy.gif" 
                alt="No Admin Access"
                width={100}
                height={100}
                className="mt-6 w-64 h-64 rounded-lg shadow-md"
            />

            <p className="mt-4 text-md text-gray-700 dark:text-gray-300">
                Redirecting you back to safety in <span className="font-bold">5 seconds...</span>
            </p>
        </div>
    );
};

export default NotAdminPage;
