"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_TRUE_PARENT.graphql'
import { useMutation, useQuery } from "@apollo/client";
import Select from 'react-select';
import GET_CATEGORY_EXCLUDING_CURRENT from '../../graphql/mutations/GET_CATEGORY_EXCLUDING_CURRENT.graphql'

interface addCategoryProps {
  isDisabled: boolean,
  onSelectCategoryChange: (selectedCategory: string) => void;
}

const SelectCategoryAddCategory: React.FC<addCategoryProps> = ({isDisabled, onSelectCategoryChange}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    if (data && data.getCategoryWithParentTrue.category) {
      const transformedData = data.getCategoryWithParentTrue.category.map((category: any) => ({
        value: category.category_name,
        label: category.category_name,
      }));
      setCategoryOptions(transformedData);
    }
  }, [data]);

  const handleCategoryChange = (selectedOption: any) => {
    const categoryValue = selectedOption.value;
    onSelectCategoryChange(categoryValue); // Call the callback function with the selected value
  };


  useEffect(()=> {
    console.log("Here is the category data", categoryOptions)
  },[categoryOptions])

  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <div className="relative z-20 bg-white dark:bg-form-input h-full">
        <Select
          className="basic-single mb-10"
          classNamePrefix="select"
          defaultValue="Select From Categories"
          isDisabled={!isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isSearchable={isSearchable}
          name="color"
          options={categoryOptions}
          onChange={handleCategoryChange}
          noOptionsMessage={() => "No Options"}
       />
      </div>
    </div>
  );
};

export default SelectCategoryAddCategory;
