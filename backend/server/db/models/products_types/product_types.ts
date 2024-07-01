import { GraphQLEnumType } from "graphql";

export const CurrencyTypes = new GraphQLEnumType({
    name: 'Currency',
    values: {
      INR: { value: 'INR'},
      EUR: { value: 'EUR'},
      USD: { value: 'USD'}
    }
  })
