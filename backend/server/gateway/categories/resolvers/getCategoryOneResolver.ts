
import CategoryModel from "@/db/models/categories_model/categories.model";

const getCategoryOneResolver = async (parent, args, context) => {
  try {
    const { category_name } = args.input;
    /*check if username or email already exists in the database*/
   const category = await CategoryModel.findOne({category_name})

   if(!category) {
    return {
      errors: [
        {
          message: 'Was Unable To fetch category details',
          code: 'CATEGORY_NOT_FETCHED',
        },
      ],
    };
  }
  
    return {
        success: true,
        category: category,
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

export default getCategoryOneResolver;
