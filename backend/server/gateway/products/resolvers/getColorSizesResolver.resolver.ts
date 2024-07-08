import ColorModel from "@/db/models/color and size/color.model"
import SizeModel from "@/db/models/color and size/size.model"

export const getColorsResolver = async (parent, args, context) => {
    try {
        const colors = await ColorModel.find();
        
        if(colors.length === 0) {
            return {
                errors: [{
                    message: 'Was unable to fetch colors',
                    code: 'COLORS_NOT_FETCHED'
                }]
            }
        }
    
        return {
            success: true,
            colors: colors,
            errors: null
        }
    } catch (error) {
        console.log("Here is the error", error)
        return {
            errors: [
                {
                    message: 'Something went wrong',
                    code: 'Server Error'
                }
            ]
        }
    }
   
}

export const getSizesResolver = async (parent, args, context) => {
    try {
        const sizes = await SizeModel.find();
    
        if(sizes.length === 0) {
            return {
                errors: [{
                    message: 'Was unable to fetch colors',
                    code: 'COLORS_NOT_FETCHED'
                }]
            }
        }
    
        return {
            success: true,
            sizes: sizes,
            errors: null
        }
    } catch (error) {
        console.log("Here is the error", error)
        return {
            errors: [
                {
                    message: 'Something went wrong',
                    code: 'Server Error'
                }
            ]
        }
    }
}