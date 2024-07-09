import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../types/ErrorType';
import { ProductsType } from './ProductsType';

const getProductOneResponse = new GraphQLObjectType({
  name: 'getProductOneResponse',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    products: {
      type: ProductsType
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});
export default getProductOneResponse;
