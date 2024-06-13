import { Schema, model } from 'mongoose';

/*Needs to create category first then the admin can put the product inside a */
export type Product = {
  /*15*/
  name: string,
  description: string,
  stock_quantity: string,
  price: number,
  discount_price: number,
  currency: 'USD' | 'EUR' | 'INR' 
  isActive: boolean,
  weight: string,
  dimensions: string,
  material: string,
  model_number: string,
  warranty: string,
  isNew: boolean,
  shipping_weight: string,
  shipping_dimensions: string,
}

const ProductSchema = new Schema<Product>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  stock_quantity: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false
  },
  discount_price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'INR'],
    required: false,
    default: 'INR'
  },
  isActive: {
      type: Boolean,
      required: true,
      default: true
  },
  weight: {
    type: String,
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
  isNew: {
    type: Boolean,
    required: false
  },
  shipping_weight: {
    type: String,
    required: false,
  },
  shipping_dimensions: {
    type: String,
    required: false
  }
},
  {
    timestamps: true,
  });


const ProductModel = model('Product', ProductSchema);

export default ProductModel;
