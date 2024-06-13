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
  image?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Location>;
  password: Scalars['String']['input'];
  phone_number?: InputMaybe<PhoneNumber>;
  role?: InputMaybe<Role>;
  two_factor_enabled?: InputMaybe<Scalars['Boolean']['input']>;
  username: Scalars['String']['input'];
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  message?: Maybe<Scalars['String']['output']>;
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

export type CategoryReponseType = {
  __typename?: 'CategoryReponseType';
  category?: Maybe<Category>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
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
  role: Scalars['String']['output'];
  two_factor_enabled: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type LoginUserType = {
  email: Scalars['EmailAddress']['input'];
  password: Scalars['String']['input'];
};

export type MeQueryReturnType = {
  __typename?: 'MeQueryReturnType';
  account_status?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  password?: Maybe<Scalars['String']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  two_factor_enabled?: Maybe<Scalars['Boolean']['output']>;
  username?: Maybe<Scalars['String']['output']>;
};

export type PhoneNumber = {
  digits?: InputMaybe<Scalars['String']['input']>;
  prefix?: InputMaybe<Scalars['String']['input']>;
};

export type ReponseType = {
  __typename?: 'ReponseType';
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
  user?: Maybe<User>;
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
  email: Scalars['String']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'mutation';
  addUser?: Maybe<ReponseType>;
  createCategory?: Maybe<CategoryReponseType>;
  login?: Maybe<AuthPayload>;
  updateAccountStatus?: Maybe<ReponseType>;
  updateUserRole?: Maybe<ReponseType>;
  updateUserSettingsForm?: Maybe<ReponseType>;
};


export type MutationAddUserArgs = {
  input?: InputMaybe<AddUsersTypeInput>;
};


export type MutationCreateCategoryArgs = {
  input?: InputMaybe<CategoryInputType>;
};


export type MutationLoginArgs = {
  input?: InputMaybe<LoginUserType>;
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

export type Query = {
  __typename?: 'query';
  ME?: Maybe<MeQueryReturnType>;
};

export type QueryQueryVariables = Exact<{ [key: string]: never; }>;


export type QueryQuery = { __typename?: 'query', ME?: { __typename?: 'MeQueryReturnType', username?: string | null, email?: string | null, password?: string | null, account_status?: string | null, role?: string | null, two_factor_enabled?: boolean | null } | null };


export const QueryDocument = gql`
    query Query {
  ME {
    username
    email
    password
    account_status
    role
    two_factor_enabled
  }
}
    `;

/**
 * __useQueryQuery__
 *
 * To run a query within a React component, call `useQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useQueryQuery(baseOptions?: Apollo.QueryHookOptions<QueryQuery, QueryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
      }
export function useQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export function useQuerySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<QueryQuery, QueryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<QueryQuery, QueryQueryVariables>(QueryDocument, options);
        }
export type QueryQueryHookResult = ReturnType<typeof useQueryQuery>;
export type QueryLazyQueryHookResult = ReturnType<typeof useQueryLazyQuery>;
export type QuerySuspenseQueryHookResult = ReturnType<typeof useQuerySuspenseQuery>;
export type QueryQueryResult = Apollo.QueryResult<QueryQuery, QueryQueryVariables>;