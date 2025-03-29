"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {openSignIn} = useClerk()
  const {user} = useUser()

  return (
    <nav className="bg-orange-400 dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-none">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-orange-400">
    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <p>Logo</p>
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">InstaFood</span>
    </Link>
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
      {!user ? (
        <button
          type="button" onClick={()=>openSignIn()}
          className="text-white bg-orange-600 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
        >
          Login
        </button>
      ) : (
        <UserButton />
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        aria-controls="navbar-sticky"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <svg
          className="w-5 h-5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 17 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 1h15M1 7h15M1 13h15"
          />
        </svg>
      </button>
    </div>
    <div
      className={`items-center justify-between bg-orange-400 ${
        isOpen ? "flex" : "hidden"
      } w-full md:flex md:w-auto md:order-1`}
      id="navbar-sticky"
    >
      <ul className="flex  p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-orange-400 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        {["Home","Orders", "Help"].map((item) => (
          <li key={item}>
            <Link
              href={item.toLowerCase() === "home" ? "/" : `/${item.toLowerCase()}`}
              className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
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
