import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export const resetPasswordType = new GraphQLInputObjectType({
  name: 'resetPasswordType',
  fields: () => ({
    new_password: {
      type: new GraphQLNonNull(GraphQLString),
    },
    confirm_password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});
