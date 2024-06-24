import CategoryModel from "@/db/models/categories_model/categories.model";

const CreateCategoryResolver = async (parent, args, context) => {
  console.log("reached here here in Create Category REsolver")
  console.log(context, "decoded token")
  try {
    const {category_name} = args.input;

    /*check if username or email already exists in the database*/

   const category_name_exists = await CategoryModel.findOne({category_name})

   if(category_name_exists) {
    return {
      errors: [
        {
          message: 'A category with this name already exists',
          code: 'CATEGORY_EXISTS',
        },
      ],
    };
  }
  

    const created_category = new CategoryModel(
      { 
        ...args.input
      },
    );

    await created_category.save();
    if (!created_category) {
      throw new Error('Unable to create category');
    }
    console.log("Created Category:", created_category);

    return {
        success: true,
        user: created_category
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

export default CreateCategoryResolver;
