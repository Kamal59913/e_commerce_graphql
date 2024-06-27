import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const getCategoryOneInput = new GraphQLInputObjectType({
    name: 'getCategoryOneInput',
    fields: () => ({
      category_name: {type: new GraphQLNonNull(GraphQLString)},
    }) 
  })