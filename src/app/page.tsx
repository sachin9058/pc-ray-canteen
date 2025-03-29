import React from 'react'
 
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Items from '@/components/Items'
import ItemStyle from '@/components/ItemsStyle'


const page = () => {
  return (

    <div>
      <div className='h-3 ml-1 p-3 text-lg'>
        <p>Order From Canteen Now</p>
      </div>
      <div className='mt-4 py-3 bg-orange-400' >
      <Select >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an Item" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
        <SelectLabel>Items</SelectLabel>
        <SelectItem value='all'>All</SelectItem>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="beverages">Beverages</SelectItem>
          <SelectItem value="snacks">Snacks</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      <div className='grid grid-cols-3 max-sm:grid-cols-1'>
        {Items.map((item,index)=>(
          <ItemStyle key={index} name={item.name} price={item.price} image={item.image} rating={item.rating} description={item.description} />
        ))}
      </div>
    </div>
  )
}

export default page