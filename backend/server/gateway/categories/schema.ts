import CreateCategoryResolver from "./resolvers/CreateCategoryResolver";
import { CategoryInputType } from "./types/CATEGORY_INPUT_TYPE";
import { CloudinaryInput } from "./types/CloudinaryInput";
import ResponseType from "./types/ResponseType";
import CreateCloudinaryResolver from "./resolvers/CreateCloudinaryResolver";
import getCategoryResolver from "./resolvers/getCategoryResolver";
import getCategoryResponseType from "./types/getCategoryResponseType";
import { getCategoryOneInput } from "./types/getCategoryOneInput";
import getCategoryOneResolver from "./resolvers/getCategoryOneResolver";
import getCategoryOneResponseType from "./types/getCategoryOneResponseType";
import UpdateCategoryResolver from "./resolvers/UpdateCategoryResolver";
import { CategoryEditInputType } from "./types/CATEGORY_EDIT_INPUT_TYPE ";
import UpdateResponseType from "./types/UpdateResponseType";
import DeleteCategoryResolver from "./resolvers/DeleteCategory";

export const getCategoryQuery = {
    getCategory: {
        type: getCategoryResponseType,
        resolve: getCategoryResolver
    }
}

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
    },
    getCategoryOne: {
        type: getCategoryOneResponseType,
        args: {
            input: {
                type: getCategoryOneInput
            }
        },
        resolve: getCategoryOneResolver
    },
    updateCategory: {
        type: UpdateResponseType,
        args: {
            input: {
                type: CategoryEditInputType
            }
        },
        resolve: UpdateCategoryResolver
    },
    deleteCategory: {
        type: ResponseType,
        args: {
            input: {
                type: getCategoryOneInput
            }
        },
        resolve: DeleteCategoryResolver
    }
}