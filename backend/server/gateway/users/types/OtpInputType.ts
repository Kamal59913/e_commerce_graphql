import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { GraphQLEmailAddress } from 'graphql-scalars';

export const OtpInputType = new GraphQLInputObjectType({
  name: 'OtpInputType',
  fields: () => ({
    email: {
      type: new GraphQLNonNull(GraphQLEmailAddress),
    },
    otp: {
      type: new GraphQLNonNull(GraphQLString)
    }
  }),
});
