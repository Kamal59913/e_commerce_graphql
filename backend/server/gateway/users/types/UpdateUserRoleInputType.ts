import { RoleType } from '../../../db/models/users_types/users_types';
import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLInt } from 'graphql';

export const UpdateUserRoleInputType = new GraphQLInputObjectType({
  name: 'UpdateUserRoleInputType',
  fields: () => ({
    //2
    id: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: RoleType},
  })
});

