import * as yup from 'yup';

const formSchema = yup.object().shape({
  product_name: yup.string().required('Product name is required'),
  product_description: yup.string().required('Product description is required'),
  stock_quantity: yup.number().required('Stock quantity is required'),
  product_price: yup.number().required('Product price is required'),
  discount_price: yup.number().positive('Discount price must be a positive number'),
  currency: yup.string().oneOf(['USD', 'EUR', 'INR']).required('Currency is required'),
  isActive: yup.boolean().required('isActive is required'),
  weight: yup.number().positive('Weight must be a positive number'),
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
