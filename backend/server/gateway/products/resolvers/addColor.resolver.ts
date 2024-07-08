import ColorModel from "@/db/models/color and size/color.model";
import { error } from "console";
import { Collection } from "mongoose";

const addColorResolver = async (parent, args, context) => {
    try {
        const { products_color } = args.input;


        for(let i=0; i<products_color.length; i++) {
            
            const colorName = products_color[i].toLowerCase();

            /*Checking if same color exists*/
            const existingColor = await ColorModel.findOne({ color_name: colorName });
            
            if(existingColor) {
                return {
                    errors: [
                       { 
                            message: 'A color with the same name Already Exists',
                            code: 'COLOR_EXISTS'
                       }
                    ]
                }
            }

            const newColor = new ColorModel({
                color_name: colorName
            })

            await newColor.save();
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
}}

export default addColorResolver;