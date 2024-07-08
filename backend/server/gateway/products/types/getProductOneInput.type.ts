import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const getProductOneInput = new GraphQLInputObjectType({
    name: 'getProductOneInput',
    fields: () => ({
      _id: {type: new GraphQLNonNull(GraphQLString)},
    }) 
  })