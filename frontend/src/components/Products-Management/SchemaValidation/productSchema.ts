import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
  product_name: Yup.string()
    // .required('Product name is required')
    .min(3, 'Product name must be at least 3 characters long')
    .max(100, 'Product name must be less than 100 characters'),
  
  product_description: Yup.string()
    // .required('Product description is required')
    .min(10, 'Product description must be at least 10 characters long')
    .max(1000, 'Product description must be less than 1000 characters'),
  
  stock_quantity: Yup.number()
    .min(0, 'Stock quantity cannot be negative')
    .required('Stock quantity is required'),
  
  product_price: Yup.number()
    .required('Product price is required')
    .min(0, 'Product price cannot be negative'),
  
  discount_product_price: Yup.number()
    .min(0, 'Discount product price cannot be negative'),
  
  currency: Yup.mixed()
    .oneOf(['USD', 'EUR', 'INR'], 'Invalid currency')
    .default('INR'),
  
  isActive: Yup.boolean()
    .default(true)
    .required('isActive is required'),
  
  weight: Yup.number()
    .min(0, 'Weight cannot be negative'),
  
  dimensions: Yup.string()
    .max(100, 'Dimensions must be less than 100 characters'),
  
  material: Yup.string()
    .max(100, 'Material must be less than 100 characters'),
  
  model_number: Yup.string()
    .max(100, 'Model number must be less than 100 characters'),
  
  warranty: Yup.number()
    .min(0, 'Warranty cannot be negative'),
  
  isNew: Yup.boolean()
    .default(true),
  
  shipping_weight: Yup.string()
    .max(100, 'Shipping weight must be less than 100 characters'),
  
  shipping_dimensions: Yup.string()
    .max(100, 'Shipping dimensions must be less than 100 characters'),
  
  product_category: Yup.string()
    .required('Product category is required')
});
