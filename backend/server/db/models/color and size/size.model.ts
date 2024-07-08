import { Schema, model } from "mongoose";

export type Size = {
    size_name: string
}

const sizeSchema = new Schema<Size> ({
    size_name: {
        type: String,
        required: true
    }
})


const SizeModel = model('Size', sizeSchema);

export default SizeModel;