"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import Items from "@/components/Items"; // Your product list
import { generateSlug } from "@/lib/utils";
import ItemStyleProps from "@/types/product";
import Image from "next/image";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useAppContext } from "@/context/AppContext";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";

const ProductPage = () => {
    const { slug } = useParams();
    const [productData, setProductData] = useState<ItemStyleProps | null>(null);
    const {router, addToCart } = useAppContext()
    const {user} = useUser()
    const toastShown = useRef(false)

    useEffect(()=>{
        
    if(!user && !toastShown.current){
        toastShown.current = true
        toast("Please Login First")
        router.push("/")
    }
    },[user,router])

    useEffect(() => {
        const fetchProductData = () => {
            const product = Items.find((item) => generateSlug(item.name) === slug);
            setProductData(product || null);
        };

        fetchProductData();
    }, [slug]);

    if (!productData) {
        return <p>Loading</p>
    }
    const renderStars = (rating: number) => {
        const totalStars = 5;
        return (
            <div className="flex text-yellow-400">
                {[...Array(totalStars)].map((_, index) => (
                    index < rating ? <FaStar key={index} /> : <FaRegStar key={index} />
                ))}
            </div>
        );
    };

    return (
        <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                <div className="px-5 lg:px-16 xl:px-20">
                    <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                        <Image
                            src={productData.image}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-normal"
                            width={1280}
                            height={720}
                        />
                    </div>

                </div>
                <div className="flex flex-col">
                    <h1 className="text-3xl font-medium text-gray-50 mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-100">
                        Ratings {renderStars(productData.rating)}
                    </div>
                    <p className="text-gray-200 mt-3">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-medium mt-6">
                        <span  className="  text-gray-50 text-[2rem] max-sm:text-lg ml-2 font-extrabold">
                        ₹{productData.price}
                        </span>
                    </p>
                    <hr className="bg-gray-600 my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-72">
                            <tbody>
                                <tr>
                                    <td className="text-gray-600 font-medium">Brand</td>
                                    <td className="text-gray-800/50 ">Not Available</td>
                                </tr>
                                <tr>
                                    <td className="text-gray-600 font-medium">Color</td>
                                    <td className="text-gray-800/50 ">Not Available</td>
                                </tr>
                               
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => {addToCart(productData.name)}} className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData.name); router.push('/cart') }}  className="w-full py-3.5 bg-orange-600 text-white hover:bg-orange-700 transition">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductPage;
