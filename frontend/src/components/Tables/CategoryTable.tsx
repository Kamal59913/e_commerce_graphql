"use client"
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_QUERY.graphql';
import { useEffect, useState } from "react";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";

interface Category {
  category_name: string;
  category_image: string;
  category_description: EditorState;
  is_available: boolean;
  is_parent: boolean;
  parent?: { category_name: string } | null;
}


const CategoryTable = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery(GET_CATEGORIES);
  const [categoryData, setCategoryData] = useState<Category[]>([]);

  useEffect(() => {
    if (data && data.getCategory) {
      const processedCategories = data.getCategory.category.map((category: { category_description: string }) => {
        try { 
          const xyz = JSON.parse(category.category_description);
          const contentState = convertFromRaw(xyz);
          const processedDescription = EditorState.createWithContent(contentState);

          return {
            ...category,
            category_description: processedDescription,
          };
        } catch (error) {
          console.error("Error parsing category description:", error);
          return {
            ...category,
            category_description: EditorState.createEmpty(),
          };
        }
      });
      setCategoryData(processedCategories);
    }
  }, [data]);

  const onEditorStateChange = (index: number, newEditorState: any) => {
    const updatedCategoryData = [...categoryData];
    updatedCategoryData[index].category_description = newEditorState;
    setCategoryData(updatedCategoryData);
  };

  const editPageRedirect = (slug: string) => {
    router.push(`/product-management/categories/edit/${slug}`)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 xl: mt-10">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Categories
      </h4>

      <div className="flex flex-col">
      <div className="grid grid-cols-11 gap-0">
           <div className="p-2.5 xl:p-5 col-span-3">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Name
            </h5>
          </div>
          <div className="p-2.5 xl:p-5 col-span-3 col-start-4">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Details
            </h5>
          </div>
          <div className="p-2.5 xl:py-5 col-start-7">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Is Available
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:py-5 w-26 col-start-8">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Is Parent
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 col-span-2 col-start-9">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Parent Category
            </h5>
          </div>
          <div className="hidden p-2.5 text-center sm:block xl:p-5 col-span-1 col-start-11">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
            </h5>
          </div>
        </div>

        {categoryData.map((brand: Category, index: number) => (
          <div
            className={`grid grid-cols-12 sm:grid-cols-11 gap-0 ${
              index === categoryData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
            <div className="relative items-center gap-3 p-2.5 xl:p-5 col-span-3">
              <div className="flex-shrink-0">
                <img
                  src={brand.category_image}
                  alt="Brand"
                  className="h-36 mb-4"
                />
              </div>
              <div>
                <p className="font-bold text-black dark:text-white sm:block">
                  {brand.category_name} 
                </p>
              </div>
            </div>
            <div className="flex items-center p-2.5 xl:p-5 col-span-3 col-start-4">
              <Editor
                editorState={brand.category_description}
                onChange={(state : EditorState) => {
                  onEditorStateChange(index, state)
                }}
                readOnly={true}
              />
            </div>
            <div className="flex items-center justify-center p-2.5 xl:p-5 w-26 col-start-7">
              <p className="text-black dark:text-white font-semibold">
                {brand.is_available ? <>YES</> : <>NO</>}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 w-26 col-start-8">
              <p className="text-black dark:text-white font-semibold">
                {brand.is_parent ? <>YES</> : <>NO</>}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-span-2 col-start-9">
              <p className="text-meta-5">
                {brand.parent ? brand.parent.category_name : <>Not Exist</>}
              </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-span-1 col-start-11">
              <div className="mt-2 flex cursor-pointer gap-1"> 
                  <CiEdit className="h-[24px] w-[24px] hover:text-[#355e3b]"
                  onClick={()=> editPageRedirect(brand.category_name)}
                  /> 
                  <span className="ml-2"> </span>
                  <RiDeleteBin6Line className="h-[20px] w-[24px] hover:text-red"/>
              </div>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryTable;
