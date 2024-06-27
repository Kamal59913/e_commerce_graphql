import * as yup from 'yup';

const formSchema = yup.object().shape({
  product_name: yup.string().required('Product name is required').min(2, 'Product name must be at least 2 characters').max(255, 'Product name must be at most 255 characters'),
  product_description: yup.string()
  .required('Product description is required')
  .min(10, 'Product description must be at least 10 characters long')
  .max(500, 'Product description must be less than 500 characters'),
  stock_quantity: yup.number().required('Stock quantity is required').integer('Stock quantity must be a whole number'),
  product_price: yup.number().positive('Product price must be a positive number').required('Product price is required'),
  currency: yup.string().oneOf(['USD', 'EUR', 'INR']).required('Currency is required'),
  isActive: yup.boolean().required('isActive is required'),
  weight: yup.number().required('Weight is required').positive('Weight must be a positive number'),
  dimensions: yup.string(),
  material: yup.string(),
  model_number: yup.string(),
  warranty: yup.string(),
  shipping_weight: yup.string(),
  shipping_dimensions: yup.string(),
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
