import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../types/ErrorType';
import { ProductsType } from './ProductsType';

const getProductsResponseType = new GraphQLObjectType({
  name: 'getProductsResponseType',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    products: {
      type: new GraphQLList(ProductsType)
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});
export default getProductsResponseType;
