import { Schema, model } from 'mongoose';

/*Needs to create category first then the admin can put the product inside a */
export type Product = {
  /*15*/
  product_name: string,
  product_description: string,
  stock_quantity: number,
  product_price: number,
  discount_price: number,
  currency: 'USD' | 'EUR' | 'INR' 
  isActive: boolean,
  weight: number,
  dimensions: string,
  material: string,
  model_number: string,
  warranty: string,
  is_new: boolean,
  shipping_weight: string,
  shipping_dimensions: string,
  product_category: Schema.Types.ObjectId,
  product_images: { displayName: string; url: string; publicId: string }[];
}

const ProductsSchema = new Schema<Product>({
  product_name: {
    type: String,
    required: true,
  },
  product_description: {
    type: String,
    required: true,
  },
  stock_quantity: {
    type: Number,
    required: true,
  },
  product_price: {
    type: Number,
    required: true
  },
  discount_price: {
    type: Number,
    required: false,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'INR'],
    required: true,
    default: 'INR'
  },
  isActive: {
      type: Boolean,
      required: true,
      default: true
  },
  weight: {
    type: Number,
    required: false,
},
  dimensions: {
    type: String,
    required: false,
  },
  material: {
    type: String,
    required: false,
  },
  model_number: {
    type: String,
    required: false,
  },
  warranty: {
    type: String,
    required: false,
  },
  is_new: {
    type: Boolean,
    default: true
  },
  shipping_weight: {
    type: String,
    required: false,
  },
  shipping_dimensions: {
    type: String,
    required: false
  },
  product_category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
    default: null
  },
  product_images: {
    type: [
      {
        displayName: { type: String, required: true },
        url: { type: String, required: true },
        publicId: { type: String, required: true },
      },
    ],    required: false,
    default: [],
},
},
  {
    timestamps: true,
  });


const ProductsModel = model('Product', ProductsSchema);

export default ProductsModel;
