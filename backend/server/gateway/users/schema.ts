
import ReponseType from "./types/ResponseType"
import addUserResolver from "./resolver/toCreate/addUserResolver"
import updateUserResolver from "./resolver/toUpdate/updateUserResolver"
import { AddUsersTypeInput } from "./types/AddUsersTypeInput"
import { UpdateUserTypeInput } from "./types/UpdateUserTypeInput"
import AuthPayload from "./types/AuthPayLoad/AuthPayload"
import { LoginUserType } from "./types/LoginUserType"
import loginResolver from "./resolver/toLogin/loginResolver"
import MEQueryResolver from "./resolver/MEQueryResolve"
import { UpdateUserAccountStatusInputType } from "./types/UpdateUserAccountStatusInputType"
import UpdateAccountStatusResolver from "./resolver/toUpdateAccountStatus/toUpdateAccountStatusResolver"
import UpdateUserRoleResolver from "./resolver/toUpdateUserRole/toUpdateUserRoleResolver"
import { UpdateUserRoleInputType } from "./types/UpdateUserRoleInputType"
import { CategoryReponseType } from "./types/CATEGORY_RESPONSE_TYPE"
import CreateCategoryResolver from "./resolver/toCreateCategory/CreateCategoryResolver"
import { CategoryInputType } from "./types/CATEGORY_INPUT_TYPE"
import { ME_QUERY_RETURN_TYPE } from "./types/ME_QUERY_USER_RETURN_TYPE"
import { UserType } from "./types/UsersType"
import UsersList from "./types/UsersList"

export const userQuery = {
    ME: {
        type: ME_QUERY_RETURN_TYPE,
        resolve: MEQueryResolver
    },
}

export const usersMutation = {
    addUser: {
        type: ReponseType,
        args: {
            input: {
                type: AddUsersTypeInput
            }
        },
        resolve: addUserResolver
    },

    updateUserSettingsForm: {
        type: ReponseType,
        args: {
            input: {
                type: UpdateUserTypeInput
            }
        },
        resolve: updateUserResolver
    },

    updateAccountStatus: {
        type: ReponseType,
        args: {
            input: {
                type: UpdateUserAccountStatusInputType
            }
        },
        resolve: UpdateAccountStatusResolver
    },

    updateUserRole: {
        type: ReponseType,
        args: {
            input: {
                type: UpdateUserRoleInputType
            }
        },
        resolve: UpdateUserRoleResolver
    },

    login: {
        type: AuthPayload,
        args: {
            input: {
                type: LoginUserType
            }
        },
        resolve: loginResolver
    },

    createCategory: {
        type: CategoryReponseType,
        args: {
            input: {
                type: CategoryInputType
            }
        },
        resolve: CreateCategoryResolver
    }
}
