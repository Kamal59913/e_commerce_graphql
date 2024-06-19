import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } from 'graphql';
  
  
  const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
     fullname: {
        type: GraphQLString,
      },
      username: {
        type: GraphQLString,
      },
      email: {
        type: GraphQLString,
      },
  
      role: {
        type: GraphQLString,
      },
  
      account_status: {
        type: GraphQLString,
      },
      is_verified: {
        type: GraphQLBoolean,
      },
    }),
  });
  
  export default User;
  