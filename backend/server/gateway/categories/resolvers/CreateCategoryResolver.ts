import CategoryModel from "@/db/models/categories_model/categories.model";

const CreateCategoryResolver = async (parent, args, context) => {

  try {
    const {category_name, 
      category_description, 
      category_image,
      is_available,
      is_parent,
      parent} = args.input;
  
    /*check if username or email already exists in the database*/
  
   const categoryName = category_name.toLowerCase();
   const category_name_exists = await CategoryModel.findOne({category_name: categoryName})

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

  const getParent= await CategoryModel.findOne({category_name: parent})



    const created_category = new CategoryModel(
      { 
        category_name: categoryName, 
        category_description, 
        category_image,
        is_available,
        is_parent,
        parent: getParent?._id || null
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
