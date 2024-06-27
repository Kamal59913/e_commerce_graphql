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
  
  category_image: Yup.string(),
  
  isparent: Yup.boolean()
    .default(false)
    .required('isparent is required'),

  isavailable: Yup.boolean()
    .default(false)
    .required('isavailable is required'),

  // parent_category: Yup.string()
  
});
