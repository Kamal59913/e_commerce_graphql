import { GraphQLEnumType } from "graphql";

export  const CurrencyType = new GraphQLEnumType({
    name: 'CurrencyType',
    values: {
      INR: { value: 'INR' },
      USD: { value: 'USD' },
      EUR: { value: 'EUR' }
    }
  });