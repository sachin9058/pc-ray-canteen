import React from "react";
import Items from "@/components/Items";
import ItemStyle from "@/components/ItemsStyle";

const Page = () => {
  return (
    <div className="px-4 md:px-10 lg:px-16">

      <div className="my-4 flex justify-center">
        <p className="mt-2 text-base font-semibold text-white bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 rounded-md shadow-sm text-center">
          Order From Canteen Now
        </p>
      </div>

 
      <div className="py-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 md:gap-12">

        {Items.map((item, index) => (
          <ItemStyle
            key={index}
            name={item.name}
            price={item.price}
            image={item.image}
            rating={item.rating}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
