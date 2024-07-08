"use client"
import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import GET_PRODUCTS from '../../graphql/queries/GET_PRODUCTS_QUERY.graphql';
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
import DELETE_PRODUCT from '../../graphql/mutations/DELETE_PRODUCT.graphql'

import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { FaRupeeSign } from "react-icons/fa";
import { IoWarningOutline } from "react-icons/io5";



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

interface Product {
  _id: string;
  product_name: string;
  product_description: EditorState;
  stock_quantity: number;
  product_price: number;
  discount_price?: number;
  currency: "USD" | "EUR" | "INR";
  isActive: boolean;
  weight?: number;
  dimensions?: string;
  material?: string;
  model_number?: string;
  warranty?: string;
  is_new: boolean;
  shipping_weight?: string;
  shipping_dimensions?: string;
  product_category?: {
    _id: string;
    category_name: string;
  };
  product_images: ImageObject[];
  more_details: { key: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
}
const ProductsTable = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only", 
  });


  const [deleteProduct] = useMutation(DELETE_PRODUCT)
  const router = useRouter();

  const [productsData, setproductsData] = useState<Product[]>([]);
  const [open, setOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState('')
  const [productsIdSelected, setproductsIdSelected] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleOpen = (category_id: string, category_name: string) => {
    setOpen(true);
    setCategorySelected(category_name)
    setproductsIdSelected(category_id)
  };
  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    if (data && data.getProducts.products) {
      const processedProducts = data.getProducts.products.map((products: { product_description: string }) => {
        try { 
          const xyz = JSON.parse(products.product_description);
          const contentState = convertFromRaw(xyz);
          const processedDescription = EditorState.createWithContent(contentState);

          return {
            ...products,
            product_description: processedDescription,
          };
        } catch (error) {
          console.error("Error parsing category description:", error);
          return {
            ...products,
            product_description: EditorState.createEmpty(),
          };
        }
      });
      setproductsData(processedProducts);
    }
  }, [data, deleteLoading]);

useEffect(()=> {
  console.log(productsData, "Products Data")
},[productsData])

  const deletetheCategory = async () => {
    console.log("reached here on the delete logic")
    const deleteResponse  = await deleteProduct({
      variables: {
        input: {
          _id: productsIdSelected
        }
      }
    })
    if(deleteResponse.data.deleteProduct.success == true) {
        toast.success("Successfully Deleted the categoty", {
          position: "top-center",
          toastId: "randomId"
        })
        handleClose()
        setproductsData(prevData => prevData.filter(products => products._id !== productsIdSelected));
    }
    console.log(deleteResponse, "Here is the delete response")
  }

  const onEditorStateChange = (index: number, newEditorState: any) => {

  };

  const editPageRedirect = (slug: string) => {
    const encodedSlug = slugify(slug, { lower: true, strict: true });
    router.push(`/product-management/products/edit/${encodedSlug}`)
  }
  
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
          <div className="mb-2"><span className="text-lg font-semibold flex gap-2">
            <IoWarningOutline size={20} className="mt-1"/>
          Sure want to delete the Product </span> <span className="font-semibold italic"> {`${categorySelected}`} </span></div>
          <p id="child-modal-description">
              By clicking on the delete button the product will be permenantly deleted. 
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
    <div className="rounded-sm border border-stroke bg-white pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 ">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Products
      </h4>

      <div className="flex flex-col">
      <div className="grid grid-cols-12 gap-2 pr-2">
      <div className="">#</div>
           <div className="col-span-2 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Name
            </h5>
          </div>
          <div className="col-span-2 col-start-4 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Description
            </h5>
          </div>
          <div className="hidden text-center sm:block w-26 col-start-6 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Stock
            </h5>
          </div>
          <div className="hidden text-center sm:block w-26 col-start-7 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Price 
            </h5>
          </div>
          <div className="hidden text-center sm:block col-span-2 col-start-8 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Category
            </h5>
          </div>
          <div className="hidden text-center sm:block col-span-1 col-start-10 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Availablity
            </h5>
          </div>
          <div className="hidden text-center sm:block col-span-1 col-start-11 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
              Created at
            </h5>
          </div>
          <div className="hidden text-center sm:block col-span-1 col-start-12 ">
            <h5 className="text-sm font-medium uppercase xsm:text-base dark:text-white">
            </h5>
          </div>
        </div>
        
        <div className="
              overflow-scroll

        max-h-[500px] xl:max-h-[640px] scrollbar-hidden">
        {productsData.map((brand: any, index: any) => (
          <div
            className={`grid grid-cols-12 py-6 sm:grid-cols-12${
              index === productsData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={index}
          >
          <div className="">{index}</div>
          <div className="relative col-span-2 ">
              <div className="flex inline-block">
                <p className="font-bold text-black dark:text-white sm:block">
                  {brand.product_name} 
                </p>
                {/* <p> {brand.is_new? <span className="mt-1 ml-2 rounded-full text-[#00FF00] text-xs">new</span> :  ""} </p> */}
              </div>

              <div className="flex inline-block">
                <img

                  src={brand.product_images[0]?.url}
                  alt="Brand"
                  className="h-20 my-2"
                />
              </div>
           
            </div>
          <div className="flex items-center col-span-2 col-start-4">
              <Editor
                editorState={brand.product_description}
                onChange={(state : EditorState) => {
                  onEditorStateChange(index, state)
                }}
                readOnly={true}
              />
            </div>

            <div className="flex items-center justify-center py-2.5 xl:py-5 w-26 col-start-6 ">
              <p className="text-black dark:text-white font-semibold">
                {brand.stock_quantity}
              </p>
            </div>

            <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5 w-26 col-start-7 ">
              <p className="text-black dark:text-white font-semibold flex">
                {brand.product_price} {brand.currency} 
              </p>
            </div>
 
            <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5 col-span-2 col-start-8 ">
              <p className="text-meta-5">
                {brand.product_category ? brand.product_category.category_name : <>Not Exist</>}
              </p>
            </div>
            <div className="hidden items-center justify-center py-4 sm:flex xl:py-5 col-span-1 col-start-10 ">
              <p className="text-meta-5">
                {brand.isActive ? <>Yes <button className="h-2 w-2 rounded-full bg-[#00FF00] text-xs"></button> </>  : <>No <button className="h-2 w-2 rounded-full bg-[#FF5733] text-xs"></button></>}
              </p>
            </div>

            <div className="hidden items-center justify-center py-2.5 sm:flex xl:py-5 col-span-1 col-start-11 ">
            <p className="text-meta-5 ml-4">
            {new Date(parseInt(brand.createdAt)).toLocaleString()}
            </p>
            </div>

            <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 col-span-1 col-start-12 ">
              <div className="mt-2 flex cursor-pointer gap-1"> 
                  <CiEdit className="h-[24px] w-[24px] hover:text-[#355e3b]"
                  onClick={()=> editPageRedirect(brand._id)}
                  /> 
                  <span className="ml-2"> </span>
                  <RiDeleteBin6Line className="h-[20px] w-[24px] hover:text-red"
                  onClick={()=> {handleOpen(brand._id, brand.product_name)}}
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

export default ProductsTable;
