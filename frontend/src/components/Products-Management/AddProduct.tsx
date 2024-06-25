"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectParent from "../SelectGroup/SelectParent";
import formSchema from "./SchemaValidation/productsSchema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ADD_PRODUCT from "../../graphql/mutations/ADD_PRODUCTS.graphql"
import { useMutation } from "@apollo/client";
import { FormValues } from "./types/productFormvalues";
import { CldUploadWidget } from 'next-cloudinary';
import DELETE_IMAGE from '../../graphql/mutations/DELETE_CLOUDINARY.graphql'
import { CiSquareRemove } from "react-icons/ci";



interface ImageData {
  url: string;
  publicId: string;
  displayName: string;
}
 
interface moreInformation {
  key: string;
  value: string;
}

const AddCategory: React.FC = () => {

  const image_cloudinary_cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const [enabledIsAvailable, setenabledIsAvailable] = useState(false);
  const [enabledIsActive, setenabledIsActive] = useState(false);
  const [imageUrls, setImageUrls] = useState<ImageData[]>([]);
  const [displayName, setDisplayName] = useState('');
  /*image upload only possible it name and description has been written*/
  const [publicId, setPublicId] = useState<string>('');
  /*wheather to clear the image from localstorage or not*/

  const [toggleUpladedImageName, setToggleUpladedImageName] = useState(false);
  const [imagerequiredtoggle, setimagerequiredtoggle] = useState(false);
  const [counter, setCounter] = useState<moreInformation[]>([]);

  useEffect(() => {
    const product_images = localStorage.getItem('imageUrls');
    if (product_images) {
      const parsedImages: { url: string; publicId: string; displayName: string; }[] = JSON.parse(product_images);
      parsedImages.forEach((image) => {
        deleteImage(image.publicId);
      });
    }
  }, []);


  const addSection = () => {
    setCounter(prevCounter => [
      ...prevCounter,
      { key: '', value: '' }
    ]);
  };

  const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const list = [...counter];
    list[index] = {
      ...list[index],
      [name]: value,
    };
    setCounter(list);
  };
  

  
  const {
    handleSubmit,
    reset,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      product_name: "",
      product_description: "",
      stock_quantity: 0,
      product_price: 0,
      currency: 'INR',
      weight: 0,
      dimensions: ''
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue("isActive", enabledIsActive);

  }, [enabledIsActive, imageUrls, setValue]);

  const [createCategory, { data, loading, error }] = useMutation(ADD_PRODUCT);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (imageUrls.length == 0) {
      setimagerequiredtoggle(true);
      return;
    }
     else {
      setimagerequiredtoggle(false);
    }
    try {
      const submitResponse = await createCategory({
        variables: {
          input:
          {
            product_name: values.product_name,
            product_description: values.product_description,
            stock_quantity: values.stock_quantity,
            product_price: values.product_price,
            currency: values.currency,
            isActive: values.isActive,
            product_images: imageUrls,
            weight: values.weight
          }
        }
      })

      if(submitResponse.data.addProduct.success == true) {
        setImageUrls([])
        localStorage.removeItem('imageUrls')
        toast.success("Successfully added category", {
          position: "top-center",
          toastId: "randomid"
        })
      }

      const errors = submitResponse.data.addProduct.errors;
      if(errors) {
        if(errors.length>0) {
          errors.map((num: any, index: any) => {
              if(num.code == "CATEGORY_EXISTS") {
                toast.error(num.message, {
                  position: "top-center",
                  toastId: 'randomId2'
                });
              } 
          })
        } 
      } 

    } catch (e) {
      console.error(e);
    }
  }


  /*Delete Image*/
  const [deleteImageGrapqhl] = useMutation(DELETE_IMAGE);


  const deleteImage = async (publicId: string) => {
    try {
      const deleteImageResponse = await deleteImageGrapqhl({
        variables: {
          input: {
            public_id: publicId
          }
        }
      });
  
      if (deleteImageResponse.data.deleteImage.success === true) {
        // Update state to remove the image with matching publicId
        setImageUrls(prevImageUrls =>
          prevImageUrls.filter(image => image.publicId !== publicId)
        );
  
        // Update localStorage to remove the image with matching publicId
        const product_images = localStorage.getItem('imageUrls');
        if (product_images) {
          const parsedImages = JSON.parse(product_images);
          const updatedImages = parsedImages.filter((image: { publicId: string; }) => image.publicId !== publicId);
          localStorage.setItem('imageUrls', JSON.stringify(updatedImages));
        }
      }
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };
  

  return (
    <>
    <ToastContainer/>
      <Breadcrumb pageName="Add a Product" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mb-20">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('product_name')} // Register the 'first_name' field here
                />
                    {errors.product_name && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.product_name.message}
                    </p>
                  )}
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Description
                </label>
                <textarea 
                  rows={4}
                  placeholder="Category Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('product_description')} // Register the 'first_name' field here
                ></textarea>
                    {errors.product_description && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.product_description.message}
                    </p>
                  )}              
              </div>
              <div className="flex">
              <CldUploadWidget uploadPreset="cloudinary_image_upload"
              >
                    {({ open, results}) => {
                      console.log(results, "here is the results")
                      useEffect(() => {
                        if (results?.info && typeof results.info !== 'string') {
                          const info = results.info;
                          console.log(info.url, "here is the url, agaim")

                          setImageUrls((prevImageUrls) => [
                            ...prevImageUrls,
                            {
                              url: info.url,
                              publicId: info.public_id,
                              displayName: info.original_filename,
                            },
                          ]);
                
                          localStorage.setItem('imageUrls', JSON.stringify([
                            ...imageUrls,
                            {
                              url: info.url,
                              publicId: info.public_id,
                              displayName: info.original_filename,
                            },
                          ]))
                          setimagerequiredtoggle(false)
                          setToggleUpladedImageName(true);
                        }
                      }, [results]);
    
                    
                    return (
                        <button className=
                        "w-40 text-black border border-slate-600 bg-white hover:bg-[#f0f0f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white focus:outline-none dark:focus:ring-blue-800" 
                        onClick={async (e) => 
                          {
                          e.preventDefault()
                          const valid = await trigger(["product_name", "product_description"]);
                          if(valid) {
                            open()  
                          } else {
                            toast.error("Please fill out the category name and description before uploading an image", {
                              position: "top-center",
                              toastId: "randomIdFormValidation"
                            });                          
                            }}} >
                              Upload Image
                        </button>
                    )
                  }
                }
              </CldUploadWidget> 
              </div>  
  {imageUrls.length>0 && (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
  {
    imageUrls.map((image, index) => (
      <div key={index} className="relative overflow-hidden rounded-md aspect-w-8 aspect-h-6 md:aspect-w-3 md:aspect-h-6 lg:aspect-w-20 lg:aspect-h-12 xl:aspect-h-18">
        <img
          src={image.url}
          alt={image.displayName}
          className="object-cover w-full h-full"
        />
          <span className="font-bold italic text-sm">{image.displayName}</span> 
          <CiSquareRemove 
            size={24}
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              deleteImage(image.publicId);
            }}
          /> 
      </div>
    ))
  }  </div>

  )
  }
              {imagerequiredtoggle && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                     Unnable to add Product without images
                    </p>
                  )}
              
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Stock Quantity
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('stock_quantity')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description"]);
                  }}
               />
                    {errors.stock_quantity && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.stock_quantity.message}
                    </p>
                  )}
              </div>

                            
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Product Price
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('product_price')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.product_price && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.product_price.message}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Weight
                </label>
                <input
                  type="text"
                  placeholder="Product Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('weight')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.weight && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.weight.message}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Dimensions
                </label>
                <input
                  type="text"
                  placeholder="Dimensions"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('dimensions')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.dimensions && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.dimensions.message}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Material
                </label>
                <input
                  type="text"
                  placeholder="Material"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('material')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.material && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.material.message}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Model Number
                </label>
                <input
                  type="text"
                  placeholder="Model Number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('model_number')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.model_number && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.model_number.message}
                    </p>
                  )}
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Warranty Details
                </label>
                <input
                  type="text"
                  placeholder="Warrenty Details"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('warranty')} // Register the 'first_name' field here
                  onChange={(e) => {
                    trigger(["product_name", "product_description", "stock_quantity"]);
                  }}
               />
                    {errors.warranty && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.warranty.message}
                    </p>
                  )}
              </div>
      {counter.length > 0 && counter.map((data, index) => (
        <form key={index} className="grid grid-cols-2 gap-4 h-14">
          <div className="flex flex-col">
            <label htmlFor={`key${index}`} className="text-gray-700">Key {index + 1}:</label>
            <input
              type="text"
              id={`key${index}`}
              name="key"
              placeholder="Key"
              value={data.key}
              onChange={(e) => handleInputChange(index, e)}
              className="border border-slate-400 rounded-md py-2 px-3 mt-1"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`value${index}`} className="text-gray-700">Value {index + 1}:</label>
            <input
              type="text"
              id={`value${index}`}
              name="value"
              placeholder="Value"
              value={data.value}
              onChange={(e) => handleInputChange(index, e)}
              className="border border-slate-400 rounded-md py-2 px-3 mt-1"
            />
          </div>
        </form>
      ))}

      <div
        className="flex justify-center items-center border border-slate-400 h-10 cursor-pointer"
        onClick={addSection}
      >
        Add Section
      </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Is Active                  
                </label>
              <label
                htmlFor="toggle3"
                className="flex cursor-pointer select-none items-center"
              >
                <div className="relative">
                  <input
                    type="checkbox"
                    id="toggle3"
                    className="sr-only"
                    onChange={() => {
                      setenabledIsActive(!enabledIsActive);
                      trigger(["product_name", "product_description", "stock_quantity", "product_price"]);
                    }}
                    checked = {enabledIsActive}
                  />
                  <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
                  <div
                    className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
                      enabledIsActive && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
                    }`}
                  >
                    <span className={`hidden ${enabledIsActive && "!block"}`}>
                      <svg
                        className="fill-white dark:fill-black"
                        width="11"
                        height="8"
                        viewBox="0 0 11 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                          fill=""
                          stroke=""
                          strokeWidth="0.4"
                        ></path>
                      </svg>
                    </span>
                    <span className={`${enabledIsActive && "hidden"}`}>
                      <svg
                        className="h-4 w-4 stroke-current"
                        fill="none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </label>
            </div>
    <button type="submit"
            className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-64 md:w-400">
      Save
    </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCategory;
