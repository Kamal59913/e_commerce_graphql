import { GraphQLBoolean, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";

export const LoggedInUserResponseType = new GraphQLObjectType({
    name: 'LoggedInUserResponseType',
    fields: {
      fullname: {type: GraphQLString},
      email: {type: new GraphQLNonNull(GraphQLString)},
      two_factor_enabled: {type: new GraphQLNonNull(GraphQLBoolean)},
      account_status: {type: new GraphQLNonNull(GraphQLString)},
      role: {type: new GraphQLNonNull(GraphQLString)},
      is_verified: {type: new GraphQLNonNull(GraphQLBoolean)},
    }
  })