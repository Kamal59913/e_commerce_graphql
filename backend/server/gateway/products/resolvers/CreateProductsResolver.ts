import ProductsModel from "@/db/models/products_model/products.model";

const CreateProductsResolver = async (parent, args, context) => {
  console.log("reached here here in Create Products Resolver")
  try {
  /*check if username or email already exists in the database*/
  const created_product = new ProductsModel(
      { 
        ...args.input
      },
    );

    await created_product.save();
    if (!created_product) {
      return {
        errors: [
          {
            message: 'Unable to create product',
            code: 'UNABLE_TO_CREATE_PRODUCT',
          },
        ],
      }
    }
    console.log("Created Product:", created_product);

    return {
        success: true,
        user: created_product
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

export default CreateProductsResolver;
