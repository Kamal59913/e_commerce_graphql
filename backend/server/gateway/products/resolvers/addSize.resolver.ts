import SizeModel from "@/db/models/color and size/size.model";

const addSizeResolver = async (parent, args, context) => {

    try {
        const { products_size } = args.input;

        for(let i=0; i<products_size.length; i++) {

            const sizeName = products_size[i].toLowerCase();

            const existingSize = await SizeModel.findOne({ size_name: sizeName });

              
            if(existingSize) {
                return {
                    errors: [
                       { 
                            message: 'A size with the same name Already Exists',
                            code: 'SIZE_EXISTS'
                       }
                    ]
                }
            }
            const newSize = new SizeModel({
                size_name: products_size[i]
            })

            await newSize.save();
        }
    
        return {
            success: true,
            errors: null
        }
    }

catch (error) {
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



export default addSizeResolver;