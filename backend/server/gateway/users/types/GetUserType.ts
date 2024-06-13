import { GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const GetUserType = new GraphQLObjectType({
    name: 'User',
    fields: {
      username: {type: new GraphQLNonNull(GraphQLString)},
      email: {type: new GraphQLNonNull(GraphQLString)},
      // password: {type: new GraphQLNonNull(GraphQLString)},
    }
  })