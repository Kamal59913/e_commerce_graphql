import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLBoolean } from 'graphql';
import { LoggedInUserResponseType } from '../LoggedInUserResponseType';
import Error from '@/gateway/types/ErrorType';
const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    token: {
      type: GraphQLString
    },
    user: {
      type: LoggedInUserResponseType
    },
    errors: {
      type: new GraphQLList(Error),
    }
  }),
});
export default AuthPayload;


