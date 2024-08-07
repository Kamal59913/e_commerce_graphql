
import CategoryModel from "@/db/models/categories_model/categories.model";

const getCategoryWithParentTrueResolver = async (parent, args, context) => {
  try {
    /*check if username or email already exists in the database*/
   const category = await CategoryModel.find({
    is_parent: true
   })

   if(category.length == 0) {
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

export default getCategoryWithParentTrueResolver;
