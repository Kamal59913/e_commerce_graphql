import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { LocationType } from "@/db/models/users_types/users_types";

export const ME_QUERY_RETURN_TYPE = new GraphQLObjectType({
    name: 'MeQueryReturnType',
    fields: {
      username: {type: GraphQLString},
      email: {type: GraphQLString},
      password: {type: GraphQLString},
      two_factor_enabled: {type: GraphQLBoolean},
      account_status: {type: GraphQLString},
      role: {type: GraphQLString},
      is_verified: {type: GraphQLBoolean},
    }
  })