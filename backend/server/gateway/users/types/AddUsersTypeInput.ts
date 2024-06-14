import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';
import { AccountStatusType, LocationType, PhoneNumberType, RoleType } from '../../../db/models/users_types/users_types';

export const AddUsersTypeInput = new GraphQLInputObjectType({
  name: 'AddUsersTypeInput',
  fields: ({
    first_name: { type: GraphQLString },

    last_name: { type: GraphQLString },

    username: {
      type: GraphQLString,
    },
    
    fullname: {
      type: new GraphQLNonNull(GraphQLString),
    },

    image: { type: GraphQLString },

    email: {
      type: new GraphQLNonNull(GraphQLEmailAddress),
    },

    date_of_birth: { type: GraphQLString },

    password: {
      type: new GraphQLNonNull(GraphQLString)
    },
    location: { type: LocationType },

    two_factor_enabled: {
      type: GraphQLBoolean
    },
    
    is_verified: {
      type: GraphQLBoolean
    },

    role: {
      type: RoleType
    },

    phone_number: {
      type: PhoneNumberType
    },
    
    account_status: {
      type: AccountStatusType
    }

  }),
});
