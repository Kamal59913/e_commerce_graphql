"use client"
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import GET_CATEGORIES from '../../graphql/queries/GET_CATEGORY_QUERY.graphql';
import { useEffect, useState } from "react";
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useRouter } from "next/navigation";
import slugify from 'slugify';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DELETE_CATEGORY from '../../graphql/mutations/DELETE_CATEGORY.graphql'



const style = { 
  position: 'fixed' as 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  px: 4,
  py: 4,
  zIndex: 9999, // Add zIndex here
  border: 'none'
};

interface ImageObject {
  displayName: string,
  url: string,
  publicId: string
}

interface Category {
  _id: string;
  category_name: string;
  category_image: ImageObject;
  category_description: EditorState;
  is_available: boolean;
  is_parent: boolean;
  parent?: { category_name: string } | null;
}

const CategoryTable = () => {
  const { data, loading, error } = useQuery(GET_CATEGORIES, {
    fetchPolicy: "network-only", 
  });

  const [deleteCategory] = useMutation(DELETE_CATEGORY)
  const router = useRouter();

  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('')
  const [categoryIdSelected, setCategoryIdSelected] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpen = (category_id: string, category_name: string) => {
    setOpen(true);
    setCategorySelected(category_name)
    setCategoryIdSelected(category_id)
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (data && data.getCategory.category) {
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
  }, [data, deleteLoading]);



  const deletetheCategory = async () => {
    console.log("reached here on the delete logic")
    const deleteResponse  = await deleteCategory({
      variables: {
        input: {
          _id: categoryIdSelected
        }
      }
    })
    if(deleteResponse.data.deleteCategory.success == true) {
        toast.success("Successfully Deleted the categoty", {
          position: "top-center",
          toastId: "randomId"
        })
        handleClose()
        setCategoryData(prevData => prevData.filter(category => category._id !== categoryIdSelected));
    }
    console.log(deleteResponse, "Here is the delete response")
  }

  const onEditorStateChange = (index: number, newEditorState: any) => {
    const updatedCategoryData = [...categoryData];
    updatedCategoryData[index].category_description = newEditorState;
    setCategoryData(updatedCategoryData);
  };

  const editPageRedirect = (slug: string) => {
    
    const encodedSlug = slugify(slug, { lower: true, strict: true });

    router.push(`/product-management/categories/edit/${encodedSlug}`)
  }

  useEffect(()=> {
    console.log(categoryData, "Here is the category data")
  },[categoryData])


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>Loading...</p>

  

  return (
    <div className="">
    <ToastContainer/>
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400}}>
          <div className="mb-2"><span className="text-lg font-semibold">Delete Category </span> <span className="font-semibold italic"> {`${categorySelected}`} </span></div>
          <p id="child-modal-description">
              Sure want to delete !
          </p>
          <button type="button" className="mt-4 focus:outline-none text-white bg-[#D2122E] hover:bg-[#D2122E] focus:ring-4 focus:ring-[#D2122E] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-[#D2122E"
          onClick={(e)=> {
            e.preventDefault()
            deletetheCategory()
          }
          }
          > Yes Delete! </button>


<Button 
// type="button" 
// className="mt-4 ml-5 focus:outline-none text-white bg-[#D2122E] hover:bg-[#D2122E] focus:ring-4 focus:ring-[#D2122E] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-[#D2122E]"
variant="outlined"
onClick={(e)=> {
            e.preventDefault()
            handleClose()
          }
          }
          > Cancel </Button>


          </Box>
      </Modal>
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
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
              Availability
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
        
        <div className="overflow-auto max-h-[500px] xl:max-h-[640px]">
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
              <div>
                <p className="font-bold text-black dark:text-white sm:block">
                  {brand.category_name} 
                </p>
              </div>

              <div className="flex-shrink-0">
                <img
                  src={brand.category_image?.url}
                  alt="Brand"
                  className="h-36 my-2"
                />
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
                  onClick={()=> editPageRedirect(brand._id)}
                  /> 
                  <span className="ml-2"> </span>
                  <RiDeleteBin6Line className="h-[20px] w-[24px] hover:text-red"
                  onClick={()=> {handleOpen(brand._id, brand.category_name)}}
                  />
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default CategoryTable;
