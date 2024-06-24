import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export  const ProductImageType =  new GraphQLList(new GraphQLInputObjectType({
      name: 'ProductImageType',
      fields:  {
        displayName: { type: GraphQLString },
        url: { type: GraphQLString },
        publicId: { type: GraphQLString },
      },
}))
