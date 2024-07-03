import CategoryModel from "@/db/models/categories_model/categories.model";

const DeleteCategoryResolver = async (parent, args, context) => {
  try {
    const {_id} = args.input;
    const deleted_category = await CategoryModel.findByIdAndDelete(_id)
   if(!deleted_category) {
      throw new Error('Unable to Delete the Category');
  }
    return {
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

export default DeleteCategoryResolver;
