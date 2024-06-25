  import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
  import Error from '../../types/ErrorType';
import { CategoryType } from './CategoryType';

  const getCategoryResponseType = new GraphQLObjectType({
    name: 'getCategoryResponseType',
    fields: () => ({
      success: {
        type: GraphQLBoolean
      },
      category: {
        type: new GraphQLList(CategoryType)
      },
      errors: {
        type: new GraphQLList(Error),
      },
    }),
  });
  export default getCategoryResponseType;
