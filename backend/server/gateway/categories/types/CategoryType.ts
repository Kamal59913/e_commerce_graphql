import { CategoriesImageType, CategoriesOuputImageType } from "@/db/models/categories_type/image_type";
import { GraphQLBoolean, GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { GraphQLUUID } from "graphql-scalars";

export const CategoryType = new GraphQLObjectType({
    name: 'CategoryType',
    fields: () => ({
      _id: {type: GraphQLString },
      category_name: {type: GraphQLString},
      category_description: {type: GraphQLString},
      category_image: {type: CategoriesOuputImageType},
      is_available: { type: GraphQLBoolean},
      is_parent: { type: GraphQLBoolean},
      parent : {
        type: CategoryType
      }
    }) 
  })