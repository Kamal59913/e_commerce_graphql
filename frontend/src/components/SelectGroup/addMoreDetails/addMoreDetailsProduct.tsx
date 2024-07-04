"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
// import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_TRUE_PARENT.graphql'
import { useMutation, useQuery } from "@apollo/client";
import Select from 'react-select';
// import GET_CATEGORY_EXCLUDING_CURRENT from '../../graphql/mutations/GET_CATEGORY_EXCLUDING_CURRENT.graphql'

interface addCategoryProps {
  isDisabled: boolean,
  onSelectProductChange: (selectedProduct: string) => void;
}


const AddMoreDetailsProduct: React.FC<addCategoryProps> = ({isDisabled, onSelectProductChange}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  // const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categoryOptions, setCategoryOptions] = useState([]);

  // useEffect(() => {
  //   if (data && data.getCategoryWithParentTrue.category) {
  //     const transformedData = data.getCategoryWithParentTrue.category.map((category: any) => ({
  //       value: category.category_name,
  //       label: category.category_name,
  //     }));
  //     setCategoryOptions(transformedData);
  //   }
  // }, [data]);

  const handleCategoryChange = (selectedOption: any) => {
    const categoryValue = selectedOption.value;
    onSelectProductChange(categoryValue); // Call the callback function with the selected value
  };

  const colourOptions: any = [
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' },
    { value: 'red', label: 'Red' },
    { value: 'green', label: 'Green' },
    { value: 'blue', label: 'Blue' },
    { value: 'yellow', label: 'Yellow' }
  ];
  

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
      <div className="relative bg-white dark:bg-form-input">
        <Select
          className="basic-single mb-10"
          defaultValue="Select From Categories"
          classNamePrefix="select"
          isDisabled={!isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isMulti
          isSearchable={isSearchable}
          name="color"
          options={colourOptions}
          onChange={handleCategoryChange}
          noOptionsMessage={() => "No Options"}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '40px',
              height: '42px',
              border: '1px solid #9CA3AF',
              boxShadow: 'none',
            }),
            menu: (provided) => ({
              ...provided,
              position: 'relative',
            })
          }}
       />
      </div>
    </div>
  );
};

export default AddMoreDetailsProduct;
