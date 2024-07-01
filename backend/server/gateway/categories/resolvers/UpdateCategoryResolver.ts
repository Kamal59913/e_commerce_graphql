import CategoryModel from "@/db/models/categories_model/categories.model";

const UpdateCategoryResolver = async (parent, args, context) => {
  
  try {
  console.log("reached here in the update category resolver `")

    const {
      category_id,
      category_name, 
      category_description, 
      category_image,
      is_available,
      is_parent,
      parent
    } = args.input;
  
    /*check if username or email already exists in the database*/
  
   const categoryName = category_name.toLowerCase();
   const category = await CategoryModel.findById(category_id)
  
   console.log("Here is the category", category)
   if(!category) {
    return {  
      errors: [
        {
          message: 'A category with this id do not exist',
          code: 'CATEGORY_DO_NOT_EXISTS',
        },
      ],
    };
  }

  const getParent= await CategoryModel.findOne({category_name: parent})



    const updated_category = await CategoryModel.findByIdAndUpdate(
      category_id,
      { 
        category_name: categoryName, 
        category_description, 
        category_image,
        is_available,
        is_parent,
        parent: getParent?._id || null
      },
      {new : true}
    );

    if (!updated_category) {
      throw new Error('Unable to create Unable to update the category');
    }
    console.log("Updated Category:", updated_category);

    return {
        success: true,
        category: updated_category,
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

export default UpdateCategoryResolver;
