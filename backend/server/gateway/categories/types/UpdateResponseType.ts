  import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
  import Error from '../../types/ErrorType';
import { CategoryType } from './CategoryType';

  const UpdateResponseType = new GraphQLObjectType({
    name: 'UpdateResponseType',
    fields: () => ({
      success: {
        type: GraphQLBoolean
      },
      category: {
        type: CategoryType
      },
      errors: {
        type: new GraphQLList(Error),
      },
    }),
  });
  export default UpdateResponseType;
