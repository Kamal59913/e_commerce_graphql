"use client";
import React, { useEffect, useState } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import GET_COLORS from '../../../graphql/queries/GET_COLORS.graphql'
import { useMutation, useQuery } from "@apollo/client";
import Select from 'react-select';
// import GET_CATEGORY_EXCLUDING_CURRENT from '../../graphql/mutations/GET_CATEGORY_EXCLUDING_CURRENT.graphql'

interface addCategoryProps {
  isDisabled: boolean,
  onSelectedColorChange: (selectedProduct: string) => void;
}


const AddMoreDetailsColor: React.FC<addCategoryProps> = ({isDisabled, onSelectedColorChange}) => {

  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(false);

  const { data, loading, error } = useQuery(GET_COLORS);
  const [colorOptions, setColorOptions] = useState([]);

  useEffect(() => {
    if (data && data.getColors.colors) {
      const transformedData = data.getColors.colors.map((colors: any) => ({
        value: colors.color_name,
        label: colors.color_name,
      }));
      setColorOptions(transformedData);
    }
  }, [data]);

  const handleSizeChange = (selectedOptions: any) => {
    const selectedValues = selectedOptions.map((option: any) => option.value);
    onSelectedColorChange(selectedValues); // Call the callback function with the selected value
  };

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
          options={colorOptions}
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

export default AddMoreDetailsColor;
