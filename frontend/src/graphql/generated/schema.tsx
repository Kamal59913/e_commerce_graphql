import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  EmailAddress: { input: any; output: any; }
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Banned = 'BANNED',
  Inactive = 'INACTIVE'
}

export type AddUsersTypeInput = {
  account_status?: InputMaybe<AccountStatus>;
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['EmailAddress']['input'];
  first_name?: InputMaybe<Scalars['String']['input']>;
  fullname: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  is_verified?: InputMaybe<Scalars['Boolean']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Location>;
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<PhoneNumber>;
  role?: InputMaybe<Role>;
  two_factor_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<LoggedInUserResponseType>;
};

export type Category = {
  __typename?: 'Category';
  category_description: Scalars['String']['output'];
  category_name: Scalars['String']['output'];
  is_available: Scalars['Boolean']['output'];
  is_parent?: Maybe<Scalars['Boolean']['output']>;
  parent?: Maybe<Category>;
};

export type CategoryInputType = {
  category_description: Scalars['String']['input'];
  category_name: Scalars['String']['input'];
  is_available: Scalars['Boolean']['input'];
  is_parent?: InputMaybe<Scalars['Boolean']['input']>;
  parent?: InputMaybe<CategoryInputType>;
};

export type CategoryResponseType = {
  __typename?: 'CategoryResponseType';
  category?: Maybe<Category>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type EmailInputType = {
  email: Scalars['EmailAddress']['input'];
};

export type Error = {
  __typename?: 'Error';
  code?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  city?: InputMaybe<Scalars['String']['input']>;
  coordinates?: InputMaybe<Scalars['String']['input']>;
  country?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
};

export type LoggedInUserResponseType = {
  __typename?: 'LoggedInUserResponseType';
  account_status: Scalars['String']['output'];
  email: Scalars['String']['output'];
  fullname?: Maybe<Scalars['String']['output']>;
  is_verified: Scalars['Boolean']['output'];
  role: Scalars['String']['output'];
  two_factor_enabled: Scalars['Boolean']['output'];
};

export type LoginUserType = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type MeQueryReturnType = {
  __typename?: 'MeQueryReturnType';
  errors?: Maybe<Array<Maybe<Error>>>;
  user?: Maybe<User>;
};

export type OtpInputType = {
  email: Scalars['EmailAddress']['input'];
  otp: Scalars['String']['input'];
};

export type PhoneNumber = {
  digits?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
};

export type ResponseType = {
  __typename?: 'ResponseType';
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export enum Role {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UpdateUserImage = {
  account_status?: InputMaybe<AccountStatus>;
  id: Scalars['String']['input'];
};

export type UpdateUserRoleInputType = {
  id: Scalars['String']['input'];
  role?: InputMaybe<Role>;
};

export type UpdateUserTypeInput = {
  date_of_birth?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  last_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<PhoneNumber>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  account_status?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  fullname?: Maybe<Scalars['String']['output']>;
  is_verified?: Maybe<Scalars['Boolean']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'mutation';
  addUser?: Maybe<AuthPayload>;
  createCategory?: Maybe<CategoryResponseType>;
  getUserEmailForVerification?: Maybe<ResponseType>;
  isVerified?: Maybe<ResponseType>;
  login?: Maybe<AuthPayload>;
  resetPassword?: Maybe<ResponseType>;
  resetPasswordMail?: Maybe<ResponseType>;
  updateAccountStatus?: Maybe<ResponseType>;
  updateUserRole?: Maybe<ResponseType>;
  updateUserSettingsForm?: Maybe<ResponseType>;
  verifyOtp?: Maybe<ResponseType>;
};


export type MutationAddUserArgs = {
  input?: InputMaybe<AddUsersTypeInput>;
};


export type MutationCreateCategoryArgs = {
  input?: InputMaybe<CategoryInputType>;
};


export type MutationGetUserEmailForVerificationArgs = {
  input?: InputMaybe<EmailInputType>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginUserType>;
};


export type MutationResetPasswordArgs = {
  input?: InputMaybe<ResetPasswordType>;
};


export type MutationResetPasswordMailArgs = {
  input?: InputMaybe<OtpInputType>;
};


export type MutationUpdateAccountStatusArgs = {
  input?: InputMaybe<UpdateUserImage>;
};


export type MutationUpdateUserRoleArgs = {
  input?: InputMaybe<UpdateUserRoleInputType>;
};


export type MutationUpdateUserSettingsFormArgs = {
  input?: InputMaybe<UpdateUserTypeInput>;
};


export type MutationVerifyOtpArgs = {
  input?: InputMaybe<OtpInputType>;
};

export type Query = {
  __typename?: 'query';
  ME?: Maybe<MeQueryReturnType>;
};

export type ResetPasswordType = {
  confirm_password: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
};

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'query', ME?: { __typename?: 'MeQueryReturnType', user?: { __typename?: 'User', fullname?: string | null, username?: string | null, email?: string | null, role?: string | null, account_status?: string | null, is_verified?: boolean | null } | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };


export const MeDocument = gql`
    query ME {
  ME {
    user {
      fullname
      username
      email
      role
      account_status
      is_verified
    }
    errors {
      message
      code
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;