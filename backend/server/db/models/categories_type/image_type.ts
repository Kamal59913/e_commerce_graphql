import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

export  const CategoriesImageType =  new GraphQLInputObjectType({
      name: 'CategoriesImageType',
      fields:  {
        displayName: { type: GraphQLString },
        url: { type: GraphQLString },
        publicId: { type: GraphQLString },
      },
})


export  const CategoriesOuputImageType =  new GraphQLObjectType({
  name: 'CategoriesOutputImageType',
  fields:  {
    displayName: { type: GraphQLString },
    url: { type: GraphQLString },
    publicId: { type: GraphQLString },
  },
})
