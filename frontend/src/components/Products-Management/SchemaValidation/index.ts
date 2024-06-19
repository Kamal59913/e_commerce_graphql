import * as Yup from 'yup';

export const formSchema = Yup.object().shape({
  category_name: Yup.string()
    .required('Category name is required')
    .min(3, 'Category name must be at least 3 characters long')
    .max(50, 'Category name must be less than 50 characters'),
  
  category_description: Yup.string()
    .required('Category description is required')
    .min(10, 'Category description must be at least 10 characters long')
    .max(500, 'Category description must be less than 500 characters'),
  
  category_image: Yup.string()
    .required('Category image URL is required')
    .url('Invalid URL format'),

  isparent: Yup.boolean()
    .default(false)
    .required('isparent is required'),

  isavailable: Yup.boolean()
    .default(false)
    .required('isavailable is required'),

  parent_category: Yup.string()
    .default('NOT_NULL')
    .nullable()
    .when('isparent', {
      is: false,
      then: schema => schema.required('Parent category is required when not a parent category'),
      otherwise: schema => schema.nullable()
    })
});
