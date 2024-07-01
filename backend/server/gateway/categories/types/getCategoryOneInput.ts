import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const getCategoryOneInput = new GraphQLInputObjectType({
    name: 'getCategoryOneInput',
    fields: () => ({
      _id: {type: new GraphQLNonNull(GraphQLString)},
    }) 
  })