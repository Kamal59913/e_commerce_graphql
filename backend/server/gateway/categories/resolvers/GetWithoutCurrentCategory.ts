import CategoryModel from "@/db/models/categories_model/categories.model";

const getCategoryNoCurrentResolver = async (parent, args, context) => {

    try {
        const { id_to_exclude }  = args.input;
        const category = await CategoryModel.find({
            _id: { $ne: id_to_exclude },
            is_parent: true
        })

        if(category.length == 0) {
            return {
                errors: [
                    {
                        message: 'Was unable to fetch category details',
                        code: 'CATEGORY_NOT_FETCHED'
                    }
                ]
            }
        }
   
        return {
            success: true,
            category: category,
            errors: null    
        }
   
    } catch(error) {
        console.log("Error fetching categories",error);

        return {
            errors: [
                {
                    message: 'Something went wrong',
                    code: 'SERVER_ERROR'
                }
            ]
        }
    }

}

export default getCategoryNoCurrentResolver;