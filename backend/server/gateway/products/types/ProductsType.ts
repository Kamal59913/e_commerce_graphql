import { CurrencyType, moreInformationObjectType } from "@/db/models/products_type/products_type";
import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLID, GraphQLList, GraphQLObjectType } from "graphql";
import { ProductImageObjectType, ProductImageType } from "@/db/models/products_type/image_type";
import { CategoryType } from "@/gateway/categories/types/CategoryType";

export const ProductsType = new GraphQLObjectType({
    name: 'ProductsType',
    fields: () => ({
      _id:  { type: new GraphQLNonNull(GraphQLString) },
      product_name: { type: new GraphQLNonNull(GraphQLString) },
      product_description: { type: new GraphQLNonNull(GraphQLString) },
      stock_quantity: { type: new GraphQLNonNull(GraphQLFloat) },
      product_price: { type: new GraphQLNonNull(GraphQLFloat) },
      discount_price: { type: GraphQLFloat },
      currency: { type: CurrencyType},
      isActive: { type: GraphQLBoolean },
      weight: { type: GraphQLFloat },
      dimensions: { type: GraphQLString },
      material: { type: GraphQLString },
      model_number: { type: GraphQLString },
      warranty: { type: GraphQLString },
      is_new: { type: GraphQLBoolean },
      shipping_weight: { type: GraphQLString },
      shipping_dimensions: { type: GraphQLString },
      product_category: { type: 
        CategoryType
      }, // Ensure this is Non-Null if it's required
      product_images: {
        type: ProductImageObjectType
      },
      more_details : {
        type: moreInformationObjectType
      },
      createdAt: {
        type: 
          GraphQLString
        
      }

    })
  });
