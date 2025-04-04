"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";
import { FiSearch } from "react-icons/fi";
import Items from "./Items"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const pathname = usePathname();
  const router = useRouter();
  const navRef = useRef<HTMLDivElement>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<typeof Items>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = Items.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && filteredProducts.length > 0) {
      const firstProduct = filteredProducts[0];
      if (firstProduct) {
        router.push(`/product/${firstProduct.name.replace(/\s+/g, "-").toLowerCase()}`);
        setSearchQuery("")
      }
    }
  };

  return (
    <nav ref={navRef} className="bg-orange-500 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
  
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <p className="text-white text-xl font-bold">🍔 InstaFood</p>
        </Link>


        <div className="hidden md:flex flex-1 mx-8 relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown} 
          />
          
      
          {filteredProducts.length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white shadow-lg rounded-lg mt-1 max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.name}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => router.push(`/product/${product.name.replace(/\s+/g, "-").toLowerCase()}`)}
                >
                  {product.name}
                </div>
              ))}
            </div>
          )}
        </div>

  
        <div className="flex items-center space-x-4">
          {!user ? (
            <Button className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition" onClick={() => openSignIn()}>
              Login
            </Button>
          ) : (
            <UserButton />
          )}

         
          <button className="md:hidden text-white text-xl" onClick={() => setIsSearchOpen(!isSearchOpen)}>
            <FiSearch />
          </button>

          <button onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }} className="md:hidden text-white text-2xl">
            ☰
          </button>
        </div>

     
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-white p-2 shadow-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-900 outline-none focus:ring-2 focus:ring-orange-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown} 
            />
          </div>
        )}

{isMounted && (
  <div className={`absolute top-full left-0 w-full md:static md:w-auto md:flex md:space-x-8 transition-all duration-300 ease-in-out ${isOpen ? "block bg-orange-500 shadow-md" : "hidden"}`}>
    <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 mt-2 md:mt-0 md:space-x-6 border-t md:border-none border-gray-300">
      {["Home", "Cart", "Help", "Orders","Admin"].map((item) => (
        <li key={item} className="text-center md:text-left">
          <Link
            href={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
            className="block px-4 py-2 text-white border border-gray-100  text-lg font-medium hover:bg-orange-600 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:text-gray-300 transition rounded-[1rem] md:border md:border-gray-300 md:rounded-lg"
          >
            {item}
          </Link>
        </li>
      ))}
    </ul>
  </div>
)}

      </div>
    </nav>
  );
};

export default Navbar;
