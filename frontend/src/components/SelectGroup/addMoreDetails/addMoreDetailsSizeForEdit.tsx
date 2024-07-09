"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_SIZES from '../../../graphql/queries/GET_SIZES.graphql'
import { useMutation, useQuery } from "@apollo/client";
import Select from 'react-select';

interface addCategoryProps {
  isDisabled: boolean,
  onSelectSizeChange: (selectedProduct: string) => void;
  defaultValue: string[]
}


const addMoreDetailsSizeForEdit: React.FC<addCategoryProps> = ({isDisabled, onSelectSizeChange, defaultValue}) => {
  defaultValue
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  const { data, loading, error } = useQuery(GET_SIZES);
  const [sizeOptions, setSizeOptions] = useState([]);

  useEffect(() => {
    if (data && data.getSizes.sizes) {
      const transformedData = data.getSizes.sizes.map((sizes: any) => ({
        value: sizes.size_name,
        label: sizes.size_name,
      }));
      setSizeOptions(transformedData);
    }
  }, [data]);


  const handleSizeChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    onSelectSizeChange(selectedValues)
  };


  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

  const changeTextColor = () => {
    setIsOptionSelected(true);
  };

  return (
    <div>
      <div className="relative bg-white dark:bg-form-input">
        <Select
          className="basic-single mb-10 absolute"
          defaultValue="Select From Categories"
          classNamePrefix="select"
          isDisabled={!isDisabled}
          isLoading={isLoading}
          isClearable={isClearable}
          isRtl={isRtl}
          isMulti
          isSearchable={isSearchable}
          name="color"
          options={sizeOptions}
          onChange={handleSizeChange}
          noOptionsMessage={() => "No Options"}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: '42px',
              border: '1px solid #9CA3AF',
              boxShadow: 'none',
              overflowY: 'auto',
            }),
            
            menu: (provided) => ({
              ...provided,
              position: 'absolute',
            })
          }}
       />
      </div>
    </div>
  );
};

export default addMoreDetailsSizeForEdit;
