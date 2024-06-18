import React from "react";
import { useRouter } from "next/navigation";

interface CategoryCardsProps {
  title: string;
  image: string;
  link: string; // URL to navigate to
}

const SubCategoryCards: React.FC<CategoryCardsProps> = ({
  title,
  image,
  link,
}) => {
  const router = useRouter();

  const cardStyle = {
    backgroundImage: `url(${image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundColor: "rgba(173, 216, 230, 0.5)", // Light blue with 50% opacity
    opacity: 0.8, // Adjust opacity as needed
  };

  const handleCardClick = () => {
    router.push(link); // Navigate to the specified link when the card is clicked
  };
    return (
      <div className="relative rounded-md border-2 border-slate-300 h-[240px] dark:text-white" onClick={handleCardClick}>
      <div className="rounded-sm h-[190px] border border-stroke bg-[#ADD8E6] px-7 py-6 shadow-default dark:border-strokedark dark:bg-[#2C3E50] flex items-center justify-center"
      style={cardStyle}>
      </div>  
      <span className="text-md font-medium text-center flex justify-center">{title}</span>
      </div>
    );
  };

  export default SubCategoryCards;
