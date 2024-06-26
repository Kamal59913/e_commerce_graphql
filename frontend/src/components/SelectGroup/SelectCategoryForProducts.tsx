"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_QUERY.graphql'
import { useQuery } from "@apollo/client";
import Select from 'react-select';


interface addCategoryProps {
  isDisabled: boolean,
  onSelectCategoryChange: (selectedCategory: string) => void,
  disableCategoryTest : () => void

}

const SelectCategoryForProducts: React.FC<addCategoryProps> = ({isDisabled, onSelectCategoryChange, disableCategoryTest}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categoryOptions, setCategoryOptions] = useState([]);


  useEffect(() => {
    if (data && data.getCategory) {
      const transformedData = data.getCategory.category.map((category: any) => ({
        value: category.category_name,
        label: category.category_name,
      }));
      setCategoryOptions(transformedData);
    }
  }, [data]);

  const handleCategoryChange = (selectedOption: any) => {
    const categoryValue = selectedOption? selectedOption.value: "";

    if(categoryValue != "") {
      disableCategoryTest()
    }
    onSelectCategoryChange(categoryValue); // Call the callback function with the selected value
  };
    // Transform data into options array

      let options = [];
      if (data) {
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
      <div className="relative z-20 bg-white dark:bg-form-input h-full">
        <Select
          className="basic-single"
          classNamePrefix="select"
          defaultValue=""
          isDisabled={!isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={categoryOptions}
          onChange={handleCategoryChange}
       />
      </div>
    </div>
  );
};

export default SelectCategoryForProducts;
