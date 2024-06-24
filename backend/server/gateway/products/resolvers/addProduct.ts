import ProductModel from "@/db/models/products_model/products.model";

const addProduct = async (parent, args, context) => {
  console.log(args.input, "here is the input"
  )
  try {
    const created_product = new ProductModel(
      {
        ...args.input
      }
    );

    await created_product.save();

    if(!created_product) {
      throw new Error('Unable to create category');
    }

    return{
      success: true,
      errors: null
    }

  } catch (e) {
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

export default addProduct;
