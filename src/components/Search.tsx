"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
}

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch  {
        
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-12">
      <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
        Search Results for  &quot;{query}
      </h1>

      {loading ? (
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
          No results found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">
                {product.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-300">{product.description}</p>
              <p className="text-orange-500 font-bold mt-1">₹{product.price}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
