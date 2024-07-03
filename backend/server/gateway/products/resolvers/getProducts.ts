import ProductsModel from "@/db/models/products_model/products.model"

const getProductsResolver = async (parent, args, context) => {
    try {
    const products = await ProductsModel.find().populate('product_category')

    if(products.length == 0) {
        return {
            errors: [
                {
                    message: 'Was unable to fetch products details',
                    code: 'PRODUCTS_NOT_FETCHED'
                }
            ]
        }
    }
    return {
        success: true,
        products: products,
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

export default getProductsResolver;