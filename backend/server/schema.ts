import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQuery, usersMutation } from "./gateway/users/schema";
import { categoryMutation, getCategoryQuery } from "./gateway/categories/schema";
import { productMutation } from "./gateway/products/schema";

const query = new GraphQLObjectType({
  name: "query",
  fields: () => ({
    ...userQuery,
    ...getCategoryQuery
  }),   
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: () => ({
    ... usersMutation,
    ... categoryMutation,
    ... productMutation

  })
})

export const schema = new GraphQLSchema({
  mutation,
  query,
});
