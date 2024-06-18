"use client"

import React, { ReactNode } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";

interface CategoryCardsProps {
  title: string;
  image: string;
  description: string;
  price: string;
  url: string
}

const   ProductsCategory: React.FC<CategoryCardsProps> = ({
  title,
  image,
  description,
  price,
  url
}) => {

  const router = useRouter();

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
    opacity: 0.8, // Adjust opacity as needed
  };
  
  const onProductCLick = () => {
    router.push(url)
  }


  return (
<div className="dark:text-white">
  <div className="rounded-md border-2 border-slate-300 lg:w-[300px]" onClick={onProductCLick}>
    <img
      src={image}
      alt="Laptop"
      className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px] xl:h-[250px]"
    />
    <div className="p-4">
      <h1 className="inline-flex items-center text-lg font-semibold">
        {title}
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        {description}
      </p>
      <div className="mt-4">
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Sneakers
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Nike
        </span>
        <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
          #Airmax
        </span>
      </div>
      <div className="mt-3 flex items-center space-x-2">
        <span className="block text-sm font-semibold">Colors : </span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-red-400"></span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-purple-400"></span>
        <span className="block h-4 w-4 rounded-full border-2 border-gray-300 bg-orange-400"></span>
      </div>
      <div className="mt-5 flex items-center space-x-2">
        <span className="block text-sm font-semibold flex">Price : {price} <LiaRupeeSignSolid size={20}/> </span>
      </div>
      {/* <button
        type="button"
        className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      >
        Add to Cart
      </button> */}
    </div>
  </div>

</div>
  );
};

export default ProductsCategory;
