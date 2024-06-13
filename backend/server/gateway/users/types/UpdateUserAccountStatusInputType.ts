import { AccountStatusType, PhoneNumberType } from '../../../db/models/users_types/users_types';
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const UpdateUserAccountStatusInputType = new GraphQLInputObjectType({
  name: 'UpdateUserImage',
  fields: () => ({
    //2
    id: { type: new GraphQLNonNull(GraphQLString) },
    account_status: { type: AccountStatusType},
  })
});

