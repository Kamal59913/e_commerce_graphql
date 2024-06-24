import * as yup from 'yup';

const formSchema = yup.object().shape({
  product_name: yup.string().required('Product name is required').min(2, 'Product name must be at least 2 characters').max(255, 'Product name must be at most 255 characters'),
  product_description: yup.string().required('Product description is required').min(10, 'Product description must be at least 10 characters').max(1000, 'Product description must be at most 1000 characters'),
  stock_quantity: yup.number().required('Stock quantity is required').integer('Stock quantity must be a whole number'),
  product_price: yup.number().positive('Product price must be a positive number').required('Product price is required'),
  currency: yup.string().oneOf(['USD', 'EUR', 'INR']).required('Currency is required'),
  isActive: yup.boolean().required('isActive is required'),
  weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  dimensions: yup.string(),
  material: yup.string().min(2, 'Material must be at least 2 characters').max(255, 'Material must be at most 255 characters'),
  model_number: yup.string().min(2, 'Model number must be at least 2 characters').max(50, 'Model number must be at most 50 characters'),
  warranty: yup.string().min(2, 'Warranty must be at least 2 characters').max(255, 'Warranty must be at most 255 characters'),
  shipping_weight: yup.string().min(1, 'Shipping weight must be at least 1 character').max(50, 'Shipping weight must be at most 50 characters'),
  shipping_dimensions: yup.string().min(1, 'Shipping dimensions must be at least 1 character').max(255, 'Shipping dimensions must be at most 255 characters'),
  product_category: yup.mixed().nullable().test(
    'is-category-id',
    'Product category must be a valid ObjectId',
    value => {
      if (value === null || value === undefined) return true;
      return typeof value === 'string' && /^[0-9a-fA-F]{24}$/.test(value);
    }
  )
});

export default formSchema;
