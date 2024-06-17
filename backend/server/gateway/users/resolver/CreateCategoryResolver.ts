import CategoryModel from "@/db/models/categories_model/categories.model";

const CreateCategoryResolver = async (parent, args, context) => {
  try {
    const {category_name, category_description, is_available, is_parent, parent} = args.input;

    /*check if username or email already exists in the database*/
   const errors = [];


   const category_name_exists = await CategoryModel.findOne({category_name})

   if(category_name_exists) {
    errors.push({ message: "A category with this name already exists", code: "CATEGORY_ALRLEADY_EXISTS"});
    }

    if(errors.length > 0) {
        return { errors }
    }


    const created_category = new CategoryModel(
      { 
        category_name, category_description, is_available, is_parent, parent
        },
    );

    await created_category.save();
    if (!created_category) {
      throw new Error('Unable to create category');
    }
    console.log("Created Category:", created_category);

    return {
        success: true,
        message: "Category Added Successfully",
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
