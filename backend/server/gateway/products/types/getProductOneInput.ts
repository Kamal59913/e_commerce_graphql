import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const getProductsOneInput = new GraphQLInputObjectType({
    name: 'getProductsOneInput',
    fields: () => ({
      _id: {type: new GraphQLNonNull(GraphQLString)},
    }) 
  })