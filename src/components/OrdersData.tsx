'use client'
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";

// Define the Address type
interface AddressType {
  fullName: string;
  room: number;
  floor: number;
  mobile: number;
}

const OrderSummary: React.FC = () => {
  const { currency, router, getCartCount, getCartAmount } = useAppContext();
  const [selectedAddress, setSelectedAddress] = useState<AddressType | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [userAddresses, setUserAddresses] = useState<AddressType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user addresses from the backend
  useEffect(() => {
    const fetchUserAddresses = async () => {
      try {
        const response = await fetch("/api/address");

        if (!response.ok) {
          throw new Error("Failed to fetch addresses");
        }

        const data = await response.json();
        setUserAddresses(data.addresses);
      } catch (error) {
        setError("Error fetching addresses");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAddresses();
  }, []);

  const handleAddressSelect = (address: AddressType) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const shippingFee = getCartAmount() === 0 ? 0 : 15;

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">
      <h2 className="text-xl md:text-2xl font-medium text-gray-700">Order Summary</h2>
      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">
        {/* Address Selection */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Select Address</label>
          <div className="relative inline-block w-full text-sm border">
            <button
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={loading || error !== null}
            >
              <span>
                {loading
                  ? "Loading addresses..."
                  : error
                  ? "Error fetching addresses"
                  : selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.room}, ${selectedAddress.floor}, ${selectedAddress.mobile}`
                  : "Select Address"}
              </span>
              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">
                {userAddresses.length > 0 ? (
                  userAddresses.map((address, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                      onClick={() => handleAddressSelect(address)}
                    >
                      {address.fullName}, {address.mobile}, {address.room}, {address.floor}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-gray-600">No addresses found</li>
                )}
                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* Promo Code Section */}
        <div>
          <label className="text-base font-medium uppercase text-gray-600 block mb-2">Promo Code</label>
          <div className="flex flex-col items-start gap-3">
            <input
              type="text"
              placeholder="Enter promo code"
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />
            <button className="bg-orange-600 text-white px-9 py-2 hover:bg-orange-700">Apply</button>
          </div>
        </div>

        <hr className="border-gray-500/30 my-5" />

        <div className="space-y-4">
          <div className="flex justify-between text-base font-medium">
            <p className="uppercase text-gray-600">Items {getCartCount()}</p>
            <p className="text-gray-800">{currency ?? ""}{getCartAmount()}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Shipping Fee</p>
            <p className="font-medium text-gray-800">{shippingFee}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-600">Tax (2%)</p>
            <p className="font-medium text-gray-800">
              {currency ?? ""}{((getCartAmount() ?? 0) * 0.02).toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">
            <p>Total</p>
            <p>
              {currency ?? ""}{((getCartAmount() ?? 0) + Math.floor((getCartAmount() ?? 0) * 0.02) + shippingFee + parseFloat(((getCartAmount() ?? 0) * 0.02).toFixed(2))).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button onClick={() => router.push('/checkout')} className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
