import { GraphQLEnumType, GraphQLInputObjectType, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

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

export const moreInformationObjectType =  new GraphQLList(new GraphQLObjectType({
  name: 'moreInformationObjectType',
  fields:  {
    key: { type: GraphQLString },
    value: { type: GraphQLString },
  },
}))


// export const CurrencyTypes = new GraphQLEnumType({
//     name: 'Currency',
//     values: {
//       INR: { value: 'INR'},
//       EUR: { value: 'EUR'},
//       USD: { value: 'USD'}
//     }
//   })