import { GraphQLBoolean, GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

export const PhoneNUmberType = new GraphQLObjectType({
  name: 'User',
  fields: {
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    username: { type: new GraphQLNonNull(GraphQLString) },
    image: { type: GraphQLString },
    email: { type: new GraphQLNonNull(GraphQLString) },
    date_of_birth: { type: GraphQLString },
    two_factor_enabled: { type: GraphQLBoolean },
    account_status: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: GraphQLString },
    phone_number: {
      type: new GraphQLObjectType({
        name: 'PhoneNumber',
        fields: {
          prefix: { type: GraphQLString },
          digits: { type: GraphQLString }
        }
      })
    },
  }
});
