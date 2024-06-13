import { GraphQLObjectType, GraphQLList } from 'graphql';
import { UserType } from './UsersType';
import Error from '../.././types/ErrorType'

const MeQueryTypes = new GraphQLObjectType({
  name: 'MeQueryTypes',
  fields: () => ({
    user: {
      type: UserType,
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});

export default MeQueryTypes;
