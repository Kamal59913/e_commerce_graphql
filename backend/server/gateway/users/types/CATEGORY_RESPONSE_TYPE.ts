import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../../gateway/types/ErrorType';
import { CategoryType } from './CATEGORY_TYPE';

export const CategoryReponseType = new GraphQLObjectType({
  name: 'CategoryReponseType',
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
