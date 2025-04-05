'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState, ChangeEvent, FormEvent, useEffect } from "react";

interface AddAddressProps {
    fullName: string;
    room: string;
    floor: string;
    mobile: string;
}

const AddAddress: FC<AddAddressProps> = ({ fullName, room, floor, mobile }) => {
    const [address, setAddress] = useState({
        fullName: fullName || "",
        room: room || "",
        floor: floor || "",
        mobile: mobile || ""
    });

    useEffect(() => {
        setAddress({
            fullName: fullName || "",
            room: room || "",
            floor: floor || "",
            mobile: mobile || "",
        });
    }, [fullName, room, floor, mobile]);
    const router = useRouter();

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = async (e: FormEvent) => {
        e.preventDefault();
    
        try {
            const response = await fetch("/api/address", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(address),
            });
    
            const data = await response.json();
            if (response.ok) {
                alert("Address saved successfully!");
                router.push('/cart');
            } else {
                alert("Error: " + data.message);
            }
        } catch (error) {
            console.error("Error saving address:", error);
        }
    };
    

    return (
        <>
            <div className="px-6 md:px-16 lg:px-32 py-16 flex flex-col md:flex-row justify-between">
                <form onSubmit={onSubmitHandler} className="w-full">
                    <p className="text-2xl md:text-3xl text-gray-500">
                        Add Shipping <span className="font-semibold text-orange-600">Address</span>
                    </p>
                    <div className="space-y-3 max-w-sm mt-10">
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            name="fullName"
                            placeholder="Full name"
                            onChange={onChangeHandler}
                            value={address.fullName}
                            required
                        />
                        <input
                            className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                            type="text"
                            name="mobile"
                            placeholder="Phone number"
                            onChange={onChangeHandler}
                            value={address.mobile}
                            required
                        />
                        <div className="flex space-x-3">
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                name="room"
                                placeholder="Room Number"
                                onChange={onChangeHandler}
                                value={address.room}
                                required
                            />
                            <input
                                className="px-2 py-2.5 focus:border-orange-500 transition border border-gray-500/30 rounded outline-none w-full text-gray-500"
                                type="text"
                                name="floor"
                                placeholder="Floor Number"
                                onChange={onChangeHandler}
                                value={address.floor}
                                required
                            />
                        </div>
                    </div>
                    <button type="submit" className="max-w-sm w-full mt-6 bg-orange-600 text-white py-3 hover:bg-orange-700 uppercase">
                        Save address
                    </button>
                </form>
                <Image
                    className="md:mr-16 mt-16 md:mt-0"
                    src="/mylocation.svg"
                    alt="my_location_image"
                    width={400}
                    height={40}
                />
            </div>
        </>
    );
};

export default AddAddress;
