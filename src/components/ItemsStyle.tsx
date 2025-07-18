"use client";

import Image from "next/image";
import React, { FC } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import Link from "next/link";
import { FaStar, FaRegStar } from "react-icons/fa";
import { generateSlug } from "@/lib/utils";
import { useRouter } from "next/navigation";


interface ItemStyleProps {
    name : string
    image : string
    rating : number
    price : number
    description : string
}

const ItemStyle:FC<ItemStyleProps> = ({name,image,rating,price,description})=> {
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
      const router = useRouter()
  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {name}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <Image
            src={image}
            height="800"
            width="800"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="loading"
            onClick={()=>router.push(`/product/${generateSlug(name)}`)}
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as='button'
            target="__blank"
            className="px-4 py-2 rounded-xl text-lg font-normal dark:text-white"
          >
            ₹{price}
          </CardItem>
          <div className="flex justify-between items-center mt-4">
          Ratings {renderStars(rating)}
        </div>
          <CardItem
            translateZ={20}
            as={Link}
            href={`/product/${generateSlug(name)}`}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
           Order now ❤️
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ItemStyle