"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const pathname = usePathname();
  const navRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="bg-orange-500 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 shadow-lg"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-6 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <p className="text-white text-xl font-bold">🍔 InstaFood</p>
        </Link>

        <div className="flex items-center space-x-4">
          {!user ? (
            <Button
              className="bg-white text-orange-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
              onClick={() => openSignIn()}
            >
              Login
            </Button>
          ) : (
            <UserButton />
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            type="button"
            className="md:hidden inline-flex items-center p-2 w-10 h-10 justify-center text-gray-100 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-controls="navbar-sticky"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div
          className={`absolute top-full left-0 w-full md:static md:w-auto md:flex md:space-x-8 transition-all duration-300 ease-in-out ${
            isOpen ? "block bg-orange-500 shadow-md" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center p-4 md:p-0 mt-2 md:mt-0 md:space-x-6 border-t md:border-none border-gray-300">
            {["Home", "Cart", "Help", "Orders"].map((item) => (
              <li key={item} className="text-center md:text-left">
                <Link
                  href={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
                  className="block px-4 py-2 text-white text-lg font-medium hover:bg-orange-600 md:hover:bg-transparent md:hover:text-gray-900 dark:hover:text-gray-300 transition rounded-md md:border md:border-gray-300 md:rounded-lg"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
