import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
import Error from '../../types/ErrorType';
import { ProductsType } from './ProductsType';
import { getColorOutput } from './colorsAndSize.type';


const getColorsResponseType = new GraphQLObjectType({
  name: 'getColorsResponseType',
  fields: () => ({
    success: {
      type: GraphQLBoolean
    },
    colors: {
      type: new GraphQLList(getColorOutput)
    },
    errors: {
      type: new GraphQLList(Error),
    },
  }),
});
export default getColorsResponseType;
