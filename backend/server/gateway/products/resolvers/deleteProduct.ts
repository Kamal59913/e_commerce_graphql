import ProductsModel from "@/db/models/products_model/products.model";

const deleteProduct = async (parent, args, context) => {
    try {
        const {_id} = args.input;

        const product = await ProductsModel.findByIdAndDelete(_id)

        if(!product) {
            throw new Error('Unable to Delete the Product')
        }
        
        return {
            success: true,
            errors: null
        }
        
    } catch (error) {
        console.log("Here is the error", error)
    }
}   

export default deleteProduct;