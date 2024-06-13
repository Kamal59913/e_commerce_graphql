import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const CategoryInputType = new GraphQLInputObjectType({
    name: 'CategoryInputType',
    fields: () => ({
      category_name: {type: new GraphQLNonNull(GraphQLString)},
      category_description: {type: new GraphQLNonNull(GraphQLString)},
      is_available: {type: new GraphQLNonNull(GraphQLBoolean)},
      is_parent: {type: GraphQLBoolean},
      parent: {
        type: CategoryInputType
      }
    }) 
  })