import Link from "next/link";
import { FaFacebook, FaTwitter, FaInstagram, FaCcVisa, FaCcMastercard, FaCcPaypal } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 text-sm ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">InstaFood</h3>
          <p className="text-gray-400">Delivering fresh and delicious food straight to your doorstep.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
            <li><Link href="/help" className="text-gray-400 hover:text-white">FAQs</Link></li>
            <li><Link href="#" className="text-gray-400 hover:text-white">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Payment Methods</h3>
          <div className="flex space-x-3 text-gray-400">
            <FaCcVisa size={24} />
            <FaCcMastercard size={24} />
            <FaCcPaypal size={24} />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex space-x-4 text-gray-400">
            <FaFacebook size={20} />
            <FaTwitter size={20} />
            <FaInstagram size={20} />
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 mt-4 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} InstaFood. All rights reserved. <br /> This Website has been Made By Sachin Kumar. A Student of IIT (BHU) 
      </div>
    </footer>
  );
};

export default Footer;