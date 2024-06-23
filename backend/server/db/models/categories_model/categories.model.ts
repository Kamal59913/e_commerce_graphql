import { Schema, model } from 'mongoose';

export type Category = {
  category_name: string,
  category_description: string,
  category_image: string,
  is_available: Boolean,
  is_parent: Boolean,
  parent: Schema.Types.ObjectId
}

const CategorySchema = new Schema<Category>({
  category_name: {
    type: String,
    required: true
  },
  category_description: {
    type: String,
    required: true
  },
  category_image: {
    type: String,
    required: false
  },
  is_available: {
    type: Boolean,
    required: true,
    default: true
  },
  is_parent: {
    type: Boolean,
    required: true,
    default: true
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }
},
  {
    timestamps: true,
  });


const CategoryModel = model('Category', CategorySchema);

export default CategoryModel;
