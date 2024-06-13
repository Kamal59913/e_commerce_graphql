import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { LoggedInUserResponseType } from '../LoggedInUserResponseType';

const AuthPayload = new GraphQLObjectType({
  name: 'AuthPayload',
  fields: () => ({
    token: {
      type: GraphQLString
    },
    user: {
      type: LoggedInUserResponseType
    },
    message: {
      type: 
        GraphQLString
    }
  }),
});
export default AuthPayload;


