import { GraphQLObjectType, GraphQLSchema } from "graphql";
import { userQuery, usersMutation } from "./gateway/users/schema";
import { categoryMutation } from "./gateway/categories/schema";

const query = new GraphQLObjectType({
  name: "query",
  fields: () => ({
    ...userQuery
  }),   
});

const mutation = new GraphQLObjectType({
  name: "mutation",
  fields: () => ({
    ... usersMutation,
    ... categoryMutation
  })
})

export const schema = new GraphQLSchema({
  mutation,
  query,
});
