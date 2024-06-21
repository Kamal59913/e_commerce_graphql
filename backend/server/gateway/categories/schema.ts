import CreateCategoryResolver from "./resolvers/CreateCategoryResolver";
import { CategoryInputType } from "./types/CATEGORY_INPUT_TYPE";
import { CloudinaryInput } from "./types/CloudinaryInput";
import ResponseType from "./types/ResponseType";
import CreateCloudinaryResolver from "./resolvers/CreateCloudinaryResolver";

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
    deleteImage : {
        type: ResponseType,
        args: {
            input: {
                type: CloudinaryInput
            }
        },
        resolve: CreateCloudinaryResolver
    }
    // updateCategory: {

    // },
    // deleteCategory: {

    // },
    // getCategory: {

    // }
}