"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectParent from "../SelectGroup/SelectParent";
import { formSchema } from "./SchemaValidation";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import CREATE_CATEGORY from "../../graphql/mutations/CREATE_CATEGORY.graphql"
import { useMutation } from "@apollo/client";
import { FormValues } from "./types";
import { CldUploadWidget } from 'next-cloudinary';
import DELETE_IMAGE from '../../graphql/mutations/DELETE_CLOUDINARY.graphql'
import { CiSquareRemove } from "react-icons/ci";
import SelectCategory from "../SelectGroup/SelectCategory";


const AddCategory = () => {

  const image_cloudinary_cloud_name = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  const [enabledIsAvailable, setenabledIsAvailable] = useState(false);
  const [enabledIsParent, setenabledIsParent] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [displayName, setDisplayName] = useState('');
  /*image upload only possible it name and description has been written*/
  const [publicId, setPublicId] = useState<string>('');
  /*wheather to clear the image from localstorage or not*/

  const [toggleUpladedImageName, setToggleUpladedImageName] = useState(false);
  const [imagerequiredtoggle, setimagerequiredtoggle] = useState(false);

  useEffect(()=> {
    const public_id = localStorage.getItem('public_id')

       if(public_id) {
        deleteImage(public_id)
       }

  },[])

  const {
    handleSubmit,
    reset,
    register,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category_name: "",
      category_description: "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(formSchema),
  });

  useEffect(() => {
    setValue("isparent", enabledIsParent);
    setValue("isavailable", enabledIsAvailable);
    if(imageUrl != '') {
      setValue("category_image", imageUrl)
      console.log(imageUrl, "here is the image url")
    }
  }, [enabledIsParent, enabledIsAvailable, setValue]);

  const [createCategory, { data, loading, error }] = useMutation(CREATE_CATEGORY);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    if (imageUrl === '') {
      setimagerequiredtoggle(true);
      // toast.error("Unable to add category without an image", {
      //   position: "top-center",
      //   toastId: "imageUploadError"
      // });
      return;
    } else {
      setimagerequiredtoggle(false);
    }
    try {
      const submitResponse = await createCategory({
        variables: {
          input:
          {
            category_name: values.category_name,
            category_description: values.category_description,
            category_image: imageUrl,
            is_available: enabledIsParent,
            is_parent: enabledIsAvailable,
          }
        }
      })
      console.log(submitResponse.data.addCategory
        , "new response"
      )

      if(submitResponse.data.addCategory.success == true) {
        setImageUrl('')
        setToggleUpladedImageName(false)
        localStorage.removeItem('public_id')
        toast.success("Successfully added category", {
          position: "top-center",
          toastId: "randomid"
        })
      }

      const errors = submitResponse.data.addCategory.errors;
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


  const deleteImage = async (url: string) => {
    const public_id = localStorage.getItem('public_id')

    if(publicId != '' || public_id) {
    console.log(url, "here is our url")
    const deleteImageResponse = await deleteImageGrapqhl({
      variables : {
        input: 
        {
          public_id: url
        }
      }
    }) 
      if(deleteImageResponse.data.deleteImage.success == true) {
        localStorage.removeItem('public_id')
      }
  }
  }


  return (
    <>
    <ToastContainer/>
      <Breadcrumb pageName="Add a Category" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mb-20">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form className="flex flex-col gap-5.5 p-6.5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="Category Name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('category_name')} // Register the 'first_name' field here
                />
                    {errors.category_name && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.category_name.message}
                    </p>
                  )}
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Category Description
                </label>
                <textarea 
                  rows={4}
                  placeholder="Category Description"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  {...register('category_description')} // Register the 'first_name' field here
                ></textarea>
                    {errors.category_description && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.category_description.message}
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
                          setimagerequiredtoggle(false)
                          setImageUrl(info.url);
                          setDisplayName(info.original_filename);
                          setPublicId(info.public_id)
                          localStorage.setItem('public_id', info.public_id)
                          setToggleUpladedImageName(true);
                        }
                      }, [results]);
    
                    
                    return (
                        <button className=
                        "w-40 text-black border border-slate-600 bg-white hover:bg-[#f0f0f0] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-white focus:outline-none dark:focus:ring-blue-800" 
                        
                        onClick={async (e) => 
                          {
                          e.preventDefault()
                          const valid = await trigger(["category_name", "category_description"]);
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
              <span className="ml-4 mt-2 flex gap-6">{toggleUpladedImageName && 
                <> Uploaded the image <span className="font-bold italic text-md">{displayName}</span> 
                <CiSquareRemove 
                size={24}
                style={{color: 'red', cursor:'pointer'}}
                onClick={(e)=> {
                e.preventDefault()
                setToggleUpladedImageName(false)
                deleteImage(publicId)}
              }
                /> 
                </>} 
                </span>
              </div>    
              {imagerequiredtoggle && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                     Unnable to add category without an image
                    </p>
                  )}
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Is Parent                  
                </label>
              <div>
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
              setenabledIsParent(!enabledIsParent);
              trigger(["category_name", "category_description"]);
            }}
            checked = {enabledIsParent}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              enabledIsParent && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          >
            <span className={`hidden ${enabledIsParent && "!block"}`}>
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
            <span className={`${enabledIsParent && "hidden"}`}>
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
  </div>

  <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Is Available                  
      </label>
  <div>
      <label
        htmlFor="toggle4"
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            id="toggle4"
            className="sr-only"
            onChange={() => {
              setenabledIsAvailable(!enabledIsAvailable);
              trigger(["category_name", "category_description"]);
            }}
            checked={enabledIsAvailable}
          />
          <div className="block h-8 w-14 rounded-full bg-meta-9 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              enabledIsAvailable && "!right-1 !translate-x-full !bg-primary dark:!bg-white"
            }`}
          >
            <span className={`hidden ${enabledIsAvailable && "!block"}`}>
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
            <span className={`${enabledIsAvailable && "hidden"}`}>
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
    </div>
    {
    enabledIsParent&& <SelectCategory/>
    }
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
