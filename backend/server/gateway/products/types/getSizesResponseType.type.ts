import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../types/ErrorType';
import { ProductsType } from './ProductsType';
import { getSizeOutput } from './colorsAndSize.type';

const getSizesResponseType = new GraphQLObjectType({
  name: 'getSizesResponseType',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    sizes: {
      type: new GraphQLList(getSizeOutput)
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});
export default getSizesResponseType;
