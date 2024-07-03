  "use client";
  import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
  import SelectParent from "../SelectGroup/SelectParent";
  import { toast, ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { SubmitHandler, useForm, Controller } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { useEffect, useState } from "react";
  import UPDATE_CATEGORY from "../../graphql/mutations/UPDATE_PRODUCTS.graphql"
  import { useMutation, useQuery } from "@apollo/client";
  import { CldUploadWidget } from 'next-cloudinary';
  import DELETE_IMAGE from '../../graphql/mutations/DELETE_CLOUDINARY.graphql'
  import { CiSquareRemove } from "react-icons/ci";
  import SelectCategory from "../SelectGroup/SelectCategory";
  import { useRouter } from "next/navigation";
  import { Editor } from 'react-draft-wysiwyg';
  import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
  import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
  import { FormValues } from "./types";
  import { formSchema } from "./SchemaValidation";
  import GET_CATEGORY_ONE from "../../graphql/mutations/GET_CATEGORY_ONE.graphql"
  import { useParams } from "next/navigation";
  import { AiOutlineCloudUpload } from "react-icons/ai";
  import { cleanObject } from "../../../utils/removeTypeName";
  import { CiUndo } from "react-icons/ci";
  import Button from '@mui/material/Button';


  interface ImageData {
    url: string;
    publicId: string;
    displayName: string;
  }

  const EditCategory: React.FC = () => {
  const router = useRouter()

  const params = useParams()
  const slug = params['edit'].toString()

  const decodedSlug = decodeURIComponent(slug as string).replace(/-/g, ' ');


  const [categoryData, setCategoryData] = useState<any>(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [enabledIsAvailable, setenabledIsAvailable] = useState(false);
  const [enabledIsParent, setenabledIsParent] = useState(false);
  const [imageUrl, setImageUrl] = useState<ImageData | null>(null);
  /*image upload only possible it name and description has been written*/
  /*wheather to clear the image from localstorage or not*/
  const [isDisabled, setIsDisabled] = useState(false);
  const [isSingleImage, setIsSIngleImage] = useState(false);

  const [imagerequiredtoggle, setimagerequiredtoggle] = useState(false);
  const [categoryImage, setCategoryImage] = useState<ImageData | null>(null);

  /*Here to get the value from the drop down list*/
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isvalidType, setIsValidType] = useState(true);
  const [getCategoryOneData, {data, loading, error}] = useMutation(GET_CATEGORY_ONE)
  const [isDeleteImage, setIsDeleteImage] = useState(false);


  /*Unsaved Changes Option*/
  const [isDirty, setIsDirty] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);


  /*State for image toggle change*/
  const [isImageExist, setIsImageExists] = useState(false);

  /*Here to store the older image id*/
  const [older_public_id, setOlder_public_id] = useState('')

  /*Holding the data here on this*/
  const [categoryName, setCategoryName] = useState('');

  const onCategoryNameChange = (e: any) => {
    setCategoryName(e.target.value)
  }

  useEffect(() => {
    const getFromLocalHost = localStorage.getItem('first_public_id')
    if(getFromLocalHost) {
      setOlder_public_id(getFromLocalHost)
    }
  },[categoryImage])


  useEffect(() => {
        const fetchCategoryData = async () => {
          try {
            const response = await getCategoryOneData({
              variables: {
                input: {
                  _id: decodedSlug
                }
              }
            });
            if (response.data) {

              /*STARTING*/
                const {
                  category_image,
                  category_name,
                  is_parent,
                  is_available,
                  category_description,
                } = response.data.getCategoryOne.category;
      
                // Set fetched values to form fields using setValue
                setValue('category_name', category_name);
                setValue('category_description', category_description);
                setValue('category_image', category_image ? category_image.url : ''); // Set image URL or empty string
                setValue('isparent', is_parent);
                setValue('isavailable', is_available);
              /*ENDING*/

              if(response.data.getCategoryOne.category.category_image) {
                setIsImageExists(true);
                localStorage.setItem('first_public_id', response.data.getCategoryOne.category.category_image.publicId)
              }
              setCategoryImage(response.data.getCategoryOne.category.category_image) 
              setCategoryData(response.data.getCategoryOne.category); 
              setCategoryName(response.data.getCategoryOne.category.category_name)
              setenabledIsParent(response.data.getCategoryOne.category.is_parent) 
              setenabledIsAvailable(response.data.getCategoryOne.category.is_available)
              const description = await JSON.parse(response.data.getCategoryOne.category.category_description);
              const contentState = convertFromRaw(description);
              const processedDescription = EditorState.createWithContent(contentState);
              setEditorState(processedDescription);
            } 
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchCategoryData();
    }, []);

    const handleCategoryChange = (selectedCategory: string) => {
      setSelectedCategory(selectedCategory);
    };
  {
  /***All the localstorage image logic***/
    useEffect(()=> {
      const categoryImage = localStorage.getItem('categoryImage')
        if(categoryImage) {
          const parsedImages: { url: string; publicId: string; displayName: string; } = JSON.parse(categoryImage);
          deleteImage(parsedImages.publicId)
        }
    },[])

  /***################END OF LOCAL STORAGE IMAGE LOGIC####################
   * 
   ***/

  }
    useEffect(()=> {
      setIsDisabled(!isDisabled)
    }, [enabledIsParent])


    const {
      control,
      handleSubmit,
      reset,
      register,
      setValue,
      trigger,
      formState: { errors },
    } = useForm({
      defaultValues: {
      },
      mode: "onChange",
      reValidateMode: "onChange",
      resolver: yupResolver(formSchema),
    });

    useEffect(() => {
      setValue("isparent", enabledIsParent);
      setValue("isavailable", enabledIsAvailable);
      if(imageUrl?.url != '') {
        setValue("category_image", imageUrl?.url)
      }
    }, [enabledIsParent, enabledIsAvailable, setValue]);

    const updateTextDescription = async (state: any) => {
      setEditorState(state);
      setIsDirty(true)
    };

    const [updateCategory] = useMutation(UPDATE_CATEGORY);

    const onSubmit: SubmitHandler<FormValues> = async (values) => {
      const data = convertToRaw(editorState.getCurrentContent());
      const description_categories = JSON.stringify(data)

      if(!isvalidType) {
        toast.error("Invalid image format, allowed only jpeg, img and png", {
          position:"top-center"
        })
        return;
      }

      if(isSingleImage) {
        return;
      }


      try {
        const submitResponse = await updateCategory({
          variables: {
            input:
            {
              category_id: categoryData?._id,
              category_name: values.category_name,
              category_description: description_categories,
              category_image: isDeleteImage? null: {
                displayName: categoryImage?.displayName,
                url: categoryImage?.url,
                publicId: categoryImage?.publicId
              },
              is_available: enabledIsAvailable,
              is_parent: enabledIsParent,
              parent: selectedCategory
            }
          }
        })
  

        if(submitResponse.data.updateCategory.success == true) {
          setImageUrl(null)
          setCategoryImage(null)
          if(categoryImage) {
            deleteEditImage(categoryImage.publicId)
          }
          localStorage.removeItem('categoryImage')
          toast.success("Updated Category Successfully", {
            position: "top-center",
            toastId: "randomid"
          })
          router.push('/product-management/categories')
          setIsDirty(false)
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

    /*****Cloudinary Delete Image Logic Including Other Image Logic ******/
    const [deleteImageGrapqhl] = useMutation(DELETE_IMAGE);

    const deleteImage = async (url: string) => {
      const categoryImage = localStorage.getItem('categoryImage')
      if(categoryImage) {
      const deleteImageResponse = await deleteImageGrapqhl({
        variables : {
          input: 
          {
            public_id: url
          }
        }
      }) 
        if(deleteImageResponse.data.deleteImage.success == true) {
          setCategoryImage(null)
          localStorage.removeItem('categoryImage')
        }
    }
    }

    const deleteEditImage = async (publicId: string) => {
      const deleteImageResponse = await deleteImageGrapqhl({
        variables : {
          input: 
          {
            public_id: publicId
          }
        }
      }) 
        if(deleteImageResponse.data.deleteImage.success == true) {
          setCategoryImage(null)
          localStorage.removeItem('categoryImage')
        }
    
    }

    const imageLengthError = () => {
      const categoryImage = localStorage.getItem('categoryImage')

        if(categoryImage) {
          const parsedImages: { url: string; publicId: string; displayName: string; } = JSON.parse(categoryImage);
          if(parsedImages.url) {
            setIsSIngleImage(true)
            deleteImage(parsedImages.publicId)
            localStorage.removeItem('categoryImage')
            setCategoryImage(null)
      
          } 
        }else {
          setIsSIngleImage(false)
        }

    }
  /******* ENDING OF IMAGE LOGICS*/

  const redirectToBack = () => {
    router.push('/product-management/categories')
  }

  // Detect page unload and show confirmation if form is dirty
  useEffect(() => {
    const handleBeforeUnload = (e: any) => {
      if (isDirty) {
        const confirmationMessage = 'You have unsaved changes. Are you sure you want to leave?';
        e.preventDefault();
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  

    return (
      <>    
      <div>
        
      <ToastContainer/>
        <Breadcrumb pageName="Edit Category" />
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 xl:mb-40 lg:mb-36 md:mb-30 mb-40 overflow-scroll h-[740px]">
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
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    {...register('category_name')} // Register the 'first_name' field here
                    onChange={()=> setIsDirty(true)}
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
                      <Controller
                      name="category_description"
                      control={control}
                    
                      render={({ field: { onChange, value } }) => (
                        <Editor
                          editorState={editorState}
                          onEditorStateChange={state => {
                            updateTextDescription(state);
                            // onChange(convertToRaw(state.getCurrentContent()).blocks[0].text);
                          }}
                          toolbarClassName="toolbarClassName"
                          wrapperClassName="wrapperClassName"
                          editorClassName="editorClassName"
                        />
                      )}
                    />

                      {errors.category_description && (
                      <p className='text-[#FF5733] text-xs  pt-2'>
                      {errors.category_description.message}
                      </p>
                    )}              
                </div>
                <label className="block text-sm font-medium text-black dark:text-white">
                    Category Image {isDeleteImage? <> true </> : <> false</>}
                  </label>
                  {(isImageExist && !isDeleteImage &&categoryImage) ?
                    <div className="grid w-full max-w-7xl items-center space-y-4 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
                    <div className="relative overflow-hidden rounded-md aspect-w-8 aspect-h-6 md:aspect-w-3 md:aspect-h-6 lg:aspect-w-20 lg:aspect-h-12 xl:aspect-h-18">

                      <img
                        src={categoryImage?.url}
                        alt={categoryImage?.displayName}
                        className="object-cover w-full h-full"
                      />  
                      <div className="font-bold italic text-sm">{categoryImage?.displayName}</div> 
                  </div>
                  </div> :  <div className="grid w-full max-w-7xl items-center space-y-4 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
                    <div className="relative overflow-hidden rounded-md aspect-w-8 aspect-h-6 md:aspect-w-3 md:aspect-h-6 lg:aspect-w-20 lg:aspect-h-12 xl:aspect-h-18">

                      <img
                        src="https://res.cloudinary.com/dkoh04jmq/image/upload/v1719727249/No-Image-Placeholder_qnzl2m.svg"
                        alt="No Image"
                        className="object-cover w-full h-full"
                      />  
                  </div>
                  </div>
                  }
                <div className="flex gap-10">                 
                    <div className="flex gap-20">
                    <div className="relative group inline-block">

                        <AiOutlineCloudUpload
                        size={34}
                        style={{color: 'blue', cursor:'pointer'}}
                                  onClick={async (e) => 
                                  {
                                  e.preventDefault()
                                  // const valid = await trigger(["category_name", "category_description"]);
                                  
                              
                                }
                              }   
                        />
                        <div className="ml-14 absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-32 bg-slate-500 text-white text-center text-xs rounded py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Replace Image
                        </div>
              </div>
                    </div>
                            {
                !isDeleteImage && 
                              <div className="relative group inline-block">
                  <CiSquareRemove 
                  size={34} 
                  style={{color: 'red', cursor:'pointer'}}
                  onClick={(e)=> {
                  e.preventDefault()
                  setIsDeleteImage(true) //Creating a useEffect hook to handle this logic
                  // deleteImage(categoryData?.category_image?.publicId.publicId)
                  }
                }
                  /> 
                  <div className="ml-14 absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-32 bg-red text-white text-center text-xs rounded py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      Remove Image
                  </div>
              </div>
                }

  {
  isDeleteImage &&        

  <div className="relative group inline-block flex-col">
                  <CiUndo 
                  size={34} 
                  style={{color: 'blue', cursor:'pointer'}}
                  onClick={(e)=> {
                  e.preventDefault()
                  setIsDeleteImage(false) //Creating a useEffect hook to handle this logic

                  // deleteImage(categoryData?.category_image?.publicId.publicId)
                  }
                }
                  /> 
                  <div className="ml-14 absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-40 bg-slate-600 text-white text-center text-xs rounded py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Back to previous Image
                  </div>
              </div>
  }

                </div>    

                {(imagerequiredtoggle && isvalidType) &&(
                      <p className='text-[#FF5733] text-xs  pt-2'>
                      Unnable to add category without an image
                      </p>
                    )}
                {!isvalidType && (
                      <p className='text-[#FF5733] text-xs  pt-2'>
                      Only JPG, PNG and JPEG allowed
                      </p>
                    )}
                  {isSingleImage && (
                      <p className='text-[#FF5733] text-xs  pt-2'>
                      Multiple Images are not allowed
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
      <label className="block text-sm font-medium text-black dark:text-white">
          Select Parent Category
      </label>
    <SelectCategory isDisabled={isDisabled} onSelectCategoryChange={handleCategoryChange} currentCategoryId ={decodedSlug}/>
      
      <div className="flex gap-4">
      <button type="submit"
              className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 w-64 md:w-400">
        Save Changes
      </button>

      <button type="submit"
              className="py-2.5 px-2 me-2 mb-2 text-sm font-medium text-slate-900 focus:outline-none bg-white rounded-lg border border-state-200 hover:bg-slate-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-slate-100 dark:focus:ring-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-600 dark:hover:text-white dark:hover:bg-slate-700 w-36 md:w-400"
              onClick={(e)=> {
                e.preventDefault()
                redirectToBack()
              }}        
      >
              
        Cancel
      </button>
  </div>
              </form>
            </div>
          </div>
        </div>
      </div></>
    
    );
  };

  export default EditCategory;
