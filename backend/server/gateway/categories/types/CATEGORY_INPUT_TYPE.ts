import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const CategoryInputType = new GraphQLInputObjectType({
    name: 'CategoryInputType',
    fields: () => ({
      category_name: {type: new GraphQLNonNull(GraphQLString)},
      category_description: {type: new GraphQLNonNull(GraphQLString)},
      category_image: {type: GraphQLString},
      is_available: { type: new GraphQLNonNull(GraphQLBoolean)},
      is_parent: { type:new GraphQLNonNull(GraphQLBoolean)},
      parent: {
        type: CategoryInputType
      }
    }) 
  })