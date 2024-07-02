"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_QUERY.graphql'
import { useMutation, useQuery } from "@apollo/client";
import Select from 'react-select';
import GET_CATEGORY_EXCLUDING_CURRENT from '../../graphql/mutations/GET_CATEGORY_EXCLUDING_CURRENT.graphql'

interface addCategoryProps {
  isDisabled: boolean,
  onSelectCategoryChange: (selectedCategory: string) => void;
  currentCategoryId: string
}

const SelectCategory: React.FC<addCategoryProps> = ({isDisabled, onSelectCategoryChange, currentCategoryId}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  // const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [getCategories] = useMutation(GET_CATEGORY_EXCLUDING_CURRENT)


  console.log("Here is the user Id", currentCategoryId)
  useEffect(()=> {
    const fetchCategoryData = async () => {
      try{
        const response = await getCategories({
          variables: {
            input: {
              _id: currentCategoryId
            }
          }
        })
        const data = response.data.getCategoryExcludingCurrent.category
        console.log("Here is the transformed data", data)
          const transformedData = data.map((category: any) => ({
            value: category.category_name,
            label: category.category_name,
          }));
          setCategoryOptions(transformedData);
      } catch(error) {
        console.log("Here is the error", error)
      }
    };

    fetchCategoryData();
  },[])

  // useEffect(() => {
  //   if (data && data.getCategory.category) {
  //     const transformedData = data.getCategory.category.map((category: any) => ({
  //       value: category.category_name,
  //       label: category.category_name,
  //     }));
  //     setCategoryOptions(transformedData);
  //   }
  // }, [data]);

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

export default SelectCategory;
