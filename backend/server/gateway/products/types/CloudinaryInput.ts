import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const CloudinaryInput = new GraphQLInputObjectType({
    name: 'CloudinaryInput',
    fields: () => ({
      public_id: {type: new GraphQLNonNull(GraphQLString)},
    }) 
  })