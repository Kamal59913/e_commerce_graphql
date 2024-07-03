import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export  const ProductImageType =  new GraphQLList(new GraphQLInputObjectType({
      name: 'ProductImageType',
      fields:  {
        displayName: { type: GraphQLString },
        url: { type: GraphQLString },
        publicId: { type: GraphQLString },
      },
}))


export  const ProductImageObjectType =  new GraphQLList(new GraphQLObjectType({
  name: 'ProductImageObjectType',
  fields:  {
    displayName: { type: GraphQLString },
    url: { type: GraphQLString },
    publicId: { type: GraphQLString },
  },
}))