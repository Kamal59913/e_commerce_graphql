import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from 'graphql';
import { LoggedInUserResponseType } from '../LoggedInUserResponseType';
import Error from '@/gateway/types/ErrorType';
const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
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


