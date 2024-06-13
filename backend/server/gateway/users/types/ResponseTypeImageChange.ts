  import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
  import Error from '../../types/ErrorType';
  import { UserType } from './UsersType';

  const ResponseTypeImageChange = new GraphQLObjectType({
    name: 'ResponseTypeImageChange',
    fields: () => ({
      success: {
        type: GraphQLBoolean
      },
      user: {
        type: UserType
      },
      errors: {
        type: new GraphQLList(Error),
      },
    }),
  });
  export default ResponseTypeImageChange;
