"use client";
import React, { useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_QUERY.graphql'
import { useQuery } from "@apollo/client";
import Select from 'react-select';


interface addCategoryProps {
  isDisabled: boolean,
  onSelectCategoryChange: (selectedCategory: string) => void;
}

const SelectCategory: React.FC<addCategoryProps> = ({isDisabled, onSelectCategoryChange}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const { data, loading, error } = useQuery(GET_CATEGORIES);

  const handleCategoryChange = (selectedOption: any) => {
    const categoryValue = selectedOption.value;
    onSelectCategoryChange(categoryValue); // Call the callback function with the selected value
  };
    // Transform data into options array
    let options = [];
    if (data && data.getCategory && data.getCategory.getCategory) {
      options = data.getCategory.category.map((category: any) => ({
        value: category.category_name,
        label: category.category_name,
      }));
    }

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);
  
  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        Select Parent Category
      </label>

      <div className="relative z-20 bg-white dark:bg-form-input h-full">
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue="Select From Categories"
          isDisabled={!isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={options}
          onChange={handleCategoryChange}
       />
      </div>
    </div>
  );
};

export default SelectCategory;
