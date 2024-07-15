"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SelectParent from "../SelectGroup/SelectParent";
import formSchema from "./SchemaValidation/productsSchema";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import ADD_PRODUCT from "../../graphql/mutations/ADD_PRODUCTS.graphql"
import { useMutation } from "@apollo/client";
import { FormValues } from "./types/productFormvalues";
import { CldUploadWidget } from 'next-cloudinary';
import DELETE_IMAGE from '../../graphql/mutations/DELETE_CLOUDINARY.graphql'
import { CiSquareRemove } from "react-icons/ci";
import { FaMinus } from "react-icons/fa";
import SelectCategoryForProducts from "../SelectGroup/SelectCategoryForProducts";
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from 'react-select';
import AddMoreDetailsProduct from "../SelectGroup/addMoreDetails/addMoreDetailsProduct";
import AddMoreDetailsSize from "../SelectGroup/addMoreDetails/addMoreDetailsSize";
import AddMoreDetailsColor from "../SelectGroup/addMoreDetails/addMoreDetailsColor";
import { useRouter } from "next/navigation";

/*Importing add color and add sizes*/
import ADD_COLOR from "../../graphql/mutations/ADD_COLORS.graphql"
import ADD_SIZES from "../../graphql/mutations/ADD_SIZES.graphql"

/*MUI pop-up box*/
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

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


interface ImageData {
  url: string;
  publicId: string;
  displayName: string;
}
 
interface moreInformation {
  key: string;
  value: string;
}

interface ColorValues {
  values: string
}
interface SizesValues {
  values: string
}

const AddProduct: React.FC = () => {

  const router = useRouter();

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
  const [isImagesMoreThan4, setisImagesMoreThan4] = useState(false);
  const [counter, setCounter] = useState<moreInformation[]>([]);

  /*These hooks are for the category selection*/
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isDisabled, setIsDisabled] = useState(true);

  /*hook for defining category selection*/
  const [isCategorySelected, setisCategorySelected] = useState(false)

  /*react text-editor starting add it here*/
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
    );
  
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string[]>([])
  const [selectedColor, setSelectedColor] = useState<string[]>([])
  const [addColorOptions, setaddColorOptions] = useState([''])
  const [addSizeOptions, setaddSizeOptions] = useState([''])
  /* useState for the pop up open*/
  const [open, setOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  /*Here is the starting of the toggles*/
  const [sizeModalToggle, setSizeModalToggle] = useState(false);
  const [colorModalToggle, setColorModalToggle] = useState(false);

  const handleCategoryChange = (selectedCategory: string) => {
    setSelectedCategory(selectedCategory); // Update the state with the selected category
    console.log(selectedCategory, "here is the selected category")
  };
  /*Ending of Category Selection*/
  const handleProductChange = (selectedProduct: string) => {
    setSelectedProduct(selectedProduct); // Update the state with the selected category
  };
  
  const handleSizeChange = (selectedSize: any) => {
    setSelectedSize(selectedSize)
  }

  const handleColorChange = (selectedColor: any) => {
    setSelectedColor(selectedColor)
  }
  
  /*passing function to selectCategory For Products*/
  const disableCategoryTest = () => {
    setisCategorySelected(false)
  }

  useEffect(() => {
    const product_images = localStorage.getItem('imageUrls');
    if (product_images) {
      const parsedImages: { url: string; publicId: string; displayName: string; }[] = JSON.parse(product_images);
      parsedImages.forEach((image) => {
        deleteImage(image.publicId);
      });
    }
  }, []);

  useEffect(() => {
    console.log("Here is the details",counter)
  }, [counter])

  const checkIfImageMoreThan = () => {
    if(imageUrls.length> 4) {
      setisImagesMoreThan4(true)
    } else {
      setisImagesMoreThan4(false)
    }
  }

  const addSection = () => {
    setCounter(prevCounter => [
      ...prevCounter,
      { key: '', value: '' }
    ]);
  };

const removeSection = (index: any) => {
  setCounter((prevCounter) => prevCounter.filter((_, i) => i !== index));
}

const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setCounter(prevCounter => {
    const newCounter = [...prevCounter];
    newCounter[index] = {
      ...newCounter[index],
      [name]: value,
    };
    return newCounter;
  });
};

  
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

  const updateTextDescription = async (state: any) => {
    setEditorState(state);
  };

  useEffect(() => {
    setValue("isActive", enabledIsActive);
  }, [enabledIsActive, imageUrls, setValue]);

  const [createCategory, { data, loading, error }] = useMutation(ADD_PRODUCT);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const data = convertToRaw(editorState.getCurrentContent());
    const description_products = JSON.stringify(data)

    if (imageUrls.length == 0) {
      setimagerequiredtoggle(true);
      return;
    }
     else {
      setimagerequiredtoggle(false);
    }

    if(imageUrls.length> 4) {
      setisImagesMoreThan4(true);
    } else {
      setisImagesMoreThan4(false);
    }

    if(selectedCategory == "") {
      setisCategorySelected(true)
      return;
    } else {
      setisCategorySelected(false)
    }
    try {
      const submitResponse = await createCategory({
        variables: {
          input:
          {
            product_name: values.product_name,
            product_description: description_products,
            stock_quantity: values.stock_quantity,
            product_price: values.product_price,
            currency: values.currency,
            isActive: values.isActive,
            product_images: imageUrls,
            weight: values.weight,
            more_details: counter.length>0 ? counter : null,
            product_category: selectedCategory,
            sizes: selectedSize,
            colors: selectedColor
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

        router.push("/product-management/products")
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

  const handleOpen = () => {
    setOpen(true);
  };
  const handleColorOpen = () => {
    setColorOpen(true);
  };
  const handleClose = () => {
    setaddSizeOptions([''])
    setOpen(false); 
  };

  const handleColorClose = () => {
    setaddColorOptions([''])
    setColorOpen(false); 
  };
 
  /*Size and Color Submission Logic starts*/
  const [ addSizes, {client} ] = useMutation(ADD_SIZES)
  const SizeOptionsSubmit = async (e: any) => {
    e.preventDefault()
    const addSizesResponse = await addSizes({
        variables: {
         input: {
          products_size: addSizeOptions
         } 
        }
    })
    if(addSizesResponse?.data?.addProductSize?.errors[0]?.code == 'SIZE_EXISTS') {
      toast.error("Size with this name already exists", {
        position: "bottom-center",
        toastId: "SizeExistsError"
      })
      handleClose()
    }
    if(addSizesResponse.data.addProductSize.success) {
      toast.success("Successfully Added Sizes", {
        position: "bottom-center",
        toastId: "addSizesId"
      })
      client.resetStore()
      handleClose()
    }
  }
 
  const [ addColors ] = useMutation(ADD_COLOR)
  const ColorOptionsSubmit = async (e: any) => {
    e.preventDefault()
    const addColorResponse = await addColors({
      variables: {
        input: {
          products_color: addColorOptions
        }
      }
    })
    if(addColorResponse?.data?.addProductColor?.errors[0]?.code == 'COLOR_EXISTS') {
      toast.error("Color with this name already exists", {
        position: "bottom-center",
        toastId: "ColorExistsError"
      })
      handleColorClose()
    }
    if(addColorResponse.data.addProductColor.success) {
      toast.success("Successfully Added Colors", {
        position: "bottom-center",
        toastId: "addColorsId"
      })
      client.resetStore()
      handleColorClose()
    }
  }
/*End of the logic*/

  /*For Colour*/
  const increaseCount = () => {
    setaddSizeOptions([...addSizeOptions, ''])
  }
  const deleteCurrent = (index: number) => {
    console.log("Here is the deleted index", index)
    setaddSizeOptions(addSizeOptions.filter((_, i) => i !== index));
  }
  const handleOptionsInputChange = (index: number, value: string) => {
    const updatedOptions = [...addSizeOptions];
    updatedOptions[index] = value;
    setaddSizeOptions(updatedOptions);
  };

  const handleOptionsInputColorChange = (index: number, value: string) => {
    const updatedOptions = [...addColorOptions];
    updatedOptions[index] = value;
    setaddColorOptions(updatedOptions);
  };
  /*Ended Here*/

  /*For Sizes*/
  const increaseColorCount = () => {
    setaddColorOptions([...addColorOptions, ''])
  }
  const deleteColorCurrent = (index: number) => {
    console.log("Here is the deleted index", index)
    setaddColorOptions(addColorOptions.filter((_, i) => i !== index));
  }
  const handleColorOptionsInputChange = (index: number, value: string) => {
    const updatedOptions = [...addColorOptions];
    updatedOptions[index] = value;
    setaddColorOptions(updatedOptions);
  };

  /*Ended Here*/
  useEffect(()=> {
    console.log("Add color options", typeof selectedColor)
  }, [selectedColor])

  useEffect(()=> {
    console.log("Add size options", selectedSize)
  }, [selectedSize])
 
  return (
    <>
    <ToastContainer/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400}}>
          <div className="mb-2"><span className="text-lg font-semibold">Size Add </span> <span className="font-semibold italic">  </span></div>
          <p id="child-modal-description">
          </p>
          <div>

                <form onSubmit={SizeOptionsSubmit} className="">
               
                {
                  addSizeOptions.map((option: any, index: any) => (
                <>
                  <div className="relative flex">
                <label className="mt-6 mb-3 block text-sm font-medium text-black dark:text-white">
                  Option {index + 1} 
                </label>
                <button type="button" className="border border-[#ff0000] px-2 text-sm rounded-md absolute right-0 bottom-3"
                onClick={() => deleteCurrent(index)}
                > delete </button>
                </div>

                  <input
                  value={option}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) => handleOptionsInputChange(index, e.target.value)}

               />
                <button type="button" className="border border-dark-800 px-2 text-sm rounded-md mt-2" onClick={()=> {
                  
                  increaseCount()
                  }}> Add </button> 
                    </>
                  ))
                  
                }

              
            
<div>
          <button type="submit" className="mt-4 focus:outline-none text-white bg-[#000000] hover:bg-[#D2122E] focus:ring-4 focus:ring-[#D2122E] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-[#D2122E"
          > Yes Add! </button>
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
          </div>
</form>
                {/* {errors.warranty && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.warranty.message}
                    </p>
                  )} */}
              </div>

          </Box>
      </Modal>

    {/* This modal is for add color option */}
    <Modal
        open={colorOpen}
        onClose={handleColorClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 400}}>
          <div className="mb-2"><span className="text-lg font-semibold">Color Add </span> <span className="font-semibold italic">  </span></div>
          <p id="child-modal-description">
          </p>
          <div>
                <form onSubmit={ColorOptionsSubmit} className="">
                {
                  addColorOptions.map((option: any, index: any) => (
                <>
                  <div className="relative flex">
                <label className="mt-6 mb-3 block text-sm font-medium text-black dark:text-white">
                  Option {index + 1} 
                </label>
                <button type="button" className="border border-[#ff0000] px-2 text-sm rounded-md absolute right-0 bottom-3"
                onClick={() => deleteColorCurrent(index)}
                > delete </button>
                </div>

                  <input
                  value={option}
                  type="text"
                  placeholder=""
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  onChange={(e: any) => handleOptionsInputColorChange(index, e.target.value)}

               />
                <button type="button" className="border border-dark-800 px-2 text-sm rounded-md mt-2" onClick={()=> {
                  
                  increaseColorCount()
                  }}> Add </button> 
                    </>
                  ))
                  
                }   
<div>
          <button type="submit" className="mt-4 focus:outline-none text-white bg-[#000000] hover:bg-[#D2122E] focus:ring-4 focus:ring-[#D2122E] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-[#D2122E"
          > Yes Add! </button>
<Button 
// type="button" 
// className="mt-4 ml-5 focus:outline-none text-white bg-[#D2122E] hover:bg-[#D2122E] focus:ring-4 focus:ring-[#D2122E] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-[#D2122E]"
variant="outlined"
onClick={(e)=> {
            e.preventDefault()
            handleColorClose()
          }
          }
          > Cancel </Button>
          </div>
</form>
                {/* {errors.warranty && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.warranty.message}
                    </p>
                  )} */}
              </div>

          </Box>
      </Modal>

      <Breadcrumb pageName="Add a Product" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 mb-20 overflow-scroll h-[760px]">
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
                <div className="border border-slate-200 pl-2"

                >
                  <Controller
                    name="product_description"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={state => {
                          updateTextDescription(state);
                          onChange(convertToRaw(state.getCurrentContent()).blocks[0].text);
                        }}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                      />
                    )}
                  />
                  </div>

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
      
                      checkIfImageMoreThan()
                      useEffect(() => {
                        if (results?.info && typeof results.info !== 'string') {
                          const info = results.info;
                          console.log(info, "info")
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
  {(imageUrls.length>0 && !isImagesMoreThan4) && (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
  {
    imageUrls.map((image, index) => (
      <div key={index} className="relative overflow-hidden rounded-md aspect-w-8 aspect-h-6 md:aspect-w-3 md:aspect-h-6 lg:aspect-w-20 lg:aspect-h-12 xl:aspect-h-18">
        <img
          src={image.url}
          alt={image.displayName}
          className="object-cover w-full h-44"
        />
        <span className="font-bold italic text-sm">{image.displayName}</span> 
          <div className="absolute group inline-block ml-2">
            <div className="flex gap-1">
          <CiSquareRemove 
            size={24}
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={(e) => {
              e.preventDefault();
              deleteImage(image.publicId);
            }}
          /> 
          </div>
          <div className="ml-14 absolute z-10 left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-32 bg-red text-white text-center text-xs rounded py-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Remove Image
            </div>
          </div>

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
              {isImagesMoreThan4 && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                     Cannot Select Images more than 4 
                    </p>
              )}





<div className="grid grid-cols-2 gap-4">
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
</div>     
<div className="grid grid-cols-2 gap-4">
        
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
</div>

{/* Currently working on */}
<div className="grid grid-cols-2 grid-rows-1 gap-4">

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
              <div ></div>
</div>


<div className="grid grid-cols-2 grid-rows-1 gap-4">
<div>
  <div className="relative flex">
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Size
    </label>
    <span className="absolute right-0 cursor-pointer text-white bg-black text-xs px-3 py-1 rounded-md"
    onClick={handleOpen}
    >Add</span>

    </div>
    <AddMoreDetailsSize isDisabled={isDisabled} onSelectSizeChange={handleSizeChange} onAddingNew={addColorOptions} defaultValueSize={[]}/>
      {errors.dimensions && (
        <p className='text-[#FF5733] text-xs  pt-2'>
          {errors.dimensions.message}
        </p>
      )}
</div>
  <div>
  <div className="relative flex">
    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
      Color
    </label>
    <span className="absolute right-0 cursor-pointer text-white bg-black text-xs px-3 py-1 rounded-md"
    onClick={handleColorOpen}
    >Add</span>

    </div>
                <AddMoreDetailsColor isDisabled={isDisabled} onSelectedColorChange = { handleColorChange }/>
                    {errors.dimensions && (
                    <p className='text-[#FF5733] text-xs  pt-2'>
                    {errors.dimensions.message}
                    </p>
                  )}
</div>
</div>   
      <label className="block text-sm font-medium text-black dark:text-white"> Add More Details</label>
      {counter.length > 0 && counter.map((data, index) => (
  <div key={index}>
    <div className="flex justify-end gap-4">
      <span
        className="cursor-pointer text-white bg-black text-xs px-3 py-1 rounded-md"
        onClick={() => removeSection(index)}
      >
        Remove Row
      </span>
    </div>
    <div className="grid grid-cols-6 gap-4 h-14 py-2">
      <div className="flex flex-col col-span-2">
        <label htmlFor={`key${index}`} className="text-gray-700">
          Key
        </label>
        <input
          type="text"
          id={`key${index}`}
          name="key"
          placeholder="Enter key"
          value={data.key}
          onChange={(e) => handleInputChange(index, e)}
          className="border border-slate-400 rounded-md py-2 px-3"
        />
      </div>
      <div className="flex flex-col col-span-4 col-start-3">
        <label htmlFor={`value${index}`} className="text-gray-700">
          Value
        </label>
        <input
          type="text"
          id={`value${index}`}
          name="value"
          placeholder="Enter value"
          value={data.value}
          onChange={(e) => handleInputChange(index, e)}
          className="border border-slate-400 rounded-md py-2 px-3"
        />
      </div>
    </div>
  </div>
))}


      <div
        className="flex justify-center items-center border border-slate-400 h-10 cursor-pointer"
        onClick={addSection}
      >
        Add Row
      </div>
      <label className="block text-sm font-medium text-black dark:text-white">
        Select Category
    </label>
      <SelectCategoryForProducts isDisabled={isDisabled} onSelectCategoryChange={handleCategoryChange} disableCategoryTest={disableCategoryTest}/>
      {isCategorySelected && (
                    <p className='text-[#FF5733] text-xs'>
                    Unable to Add Product without Category
                    </p>
      )}
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

export default AddProduct;
