
import ResponseType from "./types/ResponseType"
import addUserResolver from "./resolver/SignUpResolver"
import updateUserResolver from "./resolver/updateUserResolver"
import { AddUsersTypeInput } from "./types/AddUsersTypeInput"
import { UpdateUserTypeInput } from "./types/UpdateUserTypeInput"
import AuthPayload from "./types/AuthPayLoad/AuthPayload"
import { LoginUserType } from "./types/LoginUserType"
import loginResolver from "./resolver/loginResolver"
import MEQueryResolver from "./resolver/MEQueryResolve"
import { UpdateUserAccountStatusInputType } from "./types/UpdateUserAccountStatusInputType"
import UpdateAccountStatusResolver from "./resolver/toUpdateAccountStatusResolver"
import UpdateUserRoleResolver from "./resolver/toUpdateUserRoleResolver"
import { UpdateUserRoleInputType } from "./types/UpdateUserRoleInputType"
import { CategoryResponseType } from "./types/CATEGORY_RESPONSE_TYPE"
import CreateCategoryResolver from "./resolver/CreateCategoryResolver"
import { CategoryInputType } from "./types/CATEGORY_INPUT_TYPE"
import { ME_QUERY_RETURN_TYPE } from "./types/ME_QUERY_USER_RETURN_TYPE"
import { UserType } from "./types/UsersType"
import UsersList from "./types/UsersList"
import { EmailInputType } from "./types/EmailInputType"
import CreateEmailSendResolver from "./resolver/CreateEmailSendResolver"
import isVerified from "./resolver/isVerified"
import { OtpInputType } from "./types/OtpInputType"
import VerifyOtpResolver from "./resolver/VerifyOtpResolver"
import { resetPasswordType } from "./types/resetPasswordType"
import resetPasswordResolver from "./resolver/resetPasswordResolver"

export const userQuery = {
    ME: {
        type: ME_QUERY_RETURN_TYPE,
        resolve: MEQueryResolver
    },
}

export const usersMutation = {
    addUser: {
        type: AuthPayload,
        args: {
            input: {
                type: AddUsersTypeInput
            }
        },
        resolve: addUserResolver
    },

    isVerified: {
        type: ResponseType,
        resolve: isVerified,
      },
    updateUserSettingsForm: {
        type: ResponseType,
        args: {
            input: {
                type: UpdateUserTypeInput
            }
        },
        resolve: updateUserResolver
    },

    updateAccountStatus: {
        type: ResponseType,
        args: {
            input: {
                type: UpdateUserAccountStatusInputType
            }
        },
        resolve: UpdateAccountStatusResolver
    },

    updateUserRole: {
        type: ResponseType,
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
        type: CategoryResponseType,
        args: {
            input: {
                type: CategoryInputType
            }
        },
        resolve: CreateCategoryResolver
    },

    getUserEmailForVerification: {
        type: ResponseType,
        args: {
            input: {
                type: EmailInputType
            }
        },
        resolve: CreateEmailSendResolver
    },

    resetPassword: {
        type: ResponseType,
        args: {
            input: {
                type: resetPasswordType
            }
        },
        resolve: resetPasswordResolver
    },

    verifyOtp: {
        type: ResponseType,
        args: {
            input: {
                type: OtpInputType
            }
        },
        resolve: VerifyOtpResolver
    },

    resetPasswordMail: {
        type: ResponseType,
        args: {
            input: {
                type: OtpInputType
            }
        },
        resolve: VerifyOtpResolver
    },
}
