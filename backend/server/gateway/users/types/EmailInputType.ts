import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

export const EmailInputType = new GraphQLInputObjectType({
  name: 'EmailInputType',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmailAddress),
    }
  }),
});
