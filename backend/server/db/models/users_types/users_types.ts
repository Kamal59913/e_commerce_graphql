  import { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLInputObjectType, GraphQLEnumType } from "graphql";

  export const AccountStatusType = new GraphQLEnumType({
      name: 'AccountStatus',
      values: {
        ACTIVE: { value: 'active' },
        INACTIVE: { value: 'inactive' },
        BANNED: { value: 'banned' }
      }
    });
    
  export  const RoleType = new GraphQLEnumType({
      name: 'Role',
      values: {
        USER: { value: 'User' },
        ADMIN: { value: 'Admin' }
      }
    });
    
  export  const LocationType = new GraphQLInputObjectType({
      name: 'Location',
      fields: {
        country: { type: GraphQLString },
        state: { type: GraphQLString },
        city: { type: GraphQLString },
        postal_code: { type: GraphQLString },
        coordinates: { type: GraphQLString },
      }
    });
    
  export  const PhoneNumberType = new GraphQLInputObjectType({
      name: 'PhoneNumber',
      fields: {
        prefix: { type: GraphQLString },
        digits: { type: GraphQLString },
      }
    });  