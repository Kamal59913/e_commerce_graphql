import { PhoneNumberType } from '../../../db/models/users_types/users_types';
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const UpdateUserTypeInput = new GraphQLInputObjectType({
  name: 'UpdateUserTypeInput',
  fields: () => ({
    //5
    id: { type: new GraphQLNonNull(GraphQLString) },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    phone_number: { type: PhoneNumberType },
    date_of_birth: { type: GraphQLString}
  })
});

