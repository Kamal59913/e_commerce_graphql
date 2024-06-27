  import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
  import Error from '../../types/ErrorType';
import { CategoryType } from './CategoryType';

  const getCategoryOneResponseType = new GraphQLObjectType({
    name: 'getCategoryOneResponseType',
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
  export default getCategoryOneResponseType;
