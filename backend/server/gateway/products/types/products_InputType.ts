import { GraphQLBoolean, GraphQLEnumType, GraphQLFloat, GraphQLInputObjectType, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { CurrencyType } from "@/db/models/products_type/products_type";

export const ProductsInputType = new GraphQLInputObjectType({
    name: 'ProductsInputType',
    fields: () => ({
      product_name: {type: new GraphQLNonNull(GraphQLString)},
      product_description: {type: new GraphQLNonNull(GraphQLString)},
      stock_quantity: {type: GraphQLInt},
      product_price: { type: new GraphQLNonNull(GraphQLFloat)},
      currency: { type: CurrencyType},
      isActive: { type: new GraphQLNonNull(GraphQLBoolean)},
      weight: {type: new GraphQLNonNull(GraphQLFloat)},
      dimensions: {type: new GraphQLNonNull(GraphQLString)},
      material: {type: new GraphQLNonNull(GraphQLString)},
      model_number: {type: new GraphQLNonNull(GraphQLString)},
      warranty: {type: new GraphQLNonNull(GraphQLFloat)},
      isNew: { type: new GraphQLNonNull(GraphQLBoolean)},
      product_category: {type: ProductsInputType},
    }) 
  })