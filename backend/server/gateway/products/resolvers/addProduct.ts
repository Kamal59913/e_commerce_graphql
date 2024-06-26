import ProductModel from "@/db/models/products_model/products.model";
import CategoryModel from "@/db/models/categories_model/categories.model";

const addProduct = async (parent, args, context) => {
  const {
    product_name,
    product_description,
    stock_quantity,
    product_price,
    discount_price,
    currency,
    isActive,
    weight,
    dimensions,
    material,
    model_number,
    warranty,
    is_new,
    shipping_weight,
    shipping_dimensions,
    product_category,
    product_images,
    more_details,
  } = args.input

  const getParent= await CategoryModel.findOne({category_name: product_category})

  try {
    const created_product = new ProductModel(
      {
        product_name,
        product_description,
        stock_quantity,
        product_price,
        discount_price,
        currency,
        isActive,
        weight,
        dimensions,
        material,
        model_number,
        warranty,
        is_new,
        shipping_weight,
        shipping_dimensions,
        product_category: getParent?._id || null,
        product_images,
        more_details,
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
