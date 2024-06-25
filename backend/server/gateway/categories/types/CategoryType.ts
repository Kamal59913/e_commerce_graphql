import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: () => ({
      category_name: {type: GraphQLString},
      category_description: {type: GraphQLString},
      category_image: {type: GraphQLString},
      is_available: { type: GraphQLBoolean},
      is_parent: { type: GraphQLBoolean},
      parent : {
        type: CategoryType
      }
    }) 
  })