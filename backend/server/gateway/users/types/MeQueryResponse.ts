import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../types/ErrorType';
import { UserType } from './UsersType';
import { ME_QUERY_RETURN_TYPE } from './ME_QUERY_USER_RETURN_TYPE';

const MeQueryResponse = new GraphQLObjectType({
  name: 'ReponseType',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    user: {
      type: ME_QUERY_RETURN_TYPE
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});
export default MeQueryResponse;
