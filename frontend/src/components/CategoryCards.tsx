import React, { ReactNode } from "react";

interface CategoryCardsProps {
  title: string;
  image: string;
}

const CategoryCards: React.FC<CategoryCardsProps> = ({
  title,
  image,
}) => {

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
    opacity: 0.8, // Adjust opacity as needed
  };
  
  return (
    <div className="relative dark:text-white">
    <div className="rounded-sm h-[160px] border border-stroke bg-[#ADD8E6] px-7 py-6 shadow-default dark:border-strokedark dark:bg-[#2C3E50] flex items-center justify-center"
    style={cardStyle}
    >
      </div>

      <span className="text-md font-medium text-center flex justify-center">{title}</span>
    </div>
  );
};

export default CategoryCards;
