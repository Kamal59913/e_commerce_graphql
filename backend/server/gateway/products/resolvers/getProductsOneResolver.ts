
import ProductsModel from "@/db/models/products_model/products.model";

const getProductsOneResolver = async (parent, args, context) => {
  try {
    const { _id } = args.input;
    /*check if username or email already exists in the database*/
   const product = await ProductsModel.findById(_id)

   if(!product) {
    return {
      errors: [
        {
          message: 'Was Unable To fetch product details',
          code: 'CATEGORY_NOT_FETCHED',
        },
      ],
    };
  }
  
    return {
        success: true,
        category: product,
        errors: null
       }  
    
    } catch (e) {
    console.log(e);
    return {
      errors: [
        {
          message: 'Something went wrong',
          code: 'SERVER_ERROR',
        },
      ],
    };
  }
};

export default getProductsOneResolver;
