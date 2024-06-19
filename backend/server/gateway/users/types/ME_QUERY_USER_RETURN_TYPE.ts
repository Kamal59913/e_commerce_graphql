import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { LocationType } from "@/db/models/users_types/users_types";
import Error from "@/gateway/types/ErrorType";
import User from "./User";

export const ME_QUERY_RETURN_TYPE = new GraphQLObjectType({
    name: 'MeQueryReturnType',
    fields: () => ({
      user: {
        type: User,
      },
      errors: {
        type: new GraphQLList(Error),
      },
    }),
  });
