  import { GraphQLObjectType, GraphQLList, GraphQLBoolean } from 'graphql';
  import Error from '../../types/ErrorType';

  const ResponseType = new GraphQLObjectType({
    name: 'CategoryResponseType',
    fields: () => ({
      success: {
        type: GraphQLBoolean
      },
      errors: {
        type: new GraphQLList(Error),
      },
    }),
  });
  export default ResponseType;
