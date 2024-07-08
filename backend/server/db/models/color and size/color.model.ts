import { Schema, model } from "mongoose";

export type Color = {
    color_name: string
}

const colorSchema = new Schema<Color> ({
    color_name: {
        type: String,
        required: true
    }
})


const ColorModel = model('Color', colorSchema);

export default ColorModel