import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLString } from "graphql";

export  const CurrencyType = new GraphQLEnumType({
    name: 'CurrencyType',
    values: {
      INR: { value: 'INR' },
      USD: { value: 'USD' },
      EUR: { value: 'EUR' }
    }
  });

  export const moreInformationType =  new GraphQLList(new GraphQLInputObjectType({
    name: 'moreInformationType',
    fields:  {
      key: { type: GraphQLString },
      value: { type: GraphQLString },
    },
}))
