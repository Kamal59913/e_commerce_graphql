import CreateCategoryResolver from "./resolvers/CreateCategoryResolver";
import { CategoryInputType } from "./types/CATEGORY_INPUT_TYPE";
import ResponseType from "./types/ResponseType";

export const categoryMutation = {
    addCategory: {
        type: ResponseType,
        args: {
            input: {
                type: CategoryInputType
            }
        },
        resolve: CreateCategoryResolver
    },
    // updateCategory: {

    // },
    // deleteCategory: {

    // },
    // getCategory: {

    // }
}