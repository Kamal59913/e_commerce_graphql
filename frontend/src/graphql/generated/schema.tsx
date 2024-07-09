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

export type CategoriesImageType = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  publicId?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type CategoriesOutputImageType = {
  __typename?: 'CategoriesOutputImageType';
  displayName?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type CategoryEditInputType = {
  category_description: Scalars['String']['input'];
  category_id: Scalars['String']['input'];
  category_image?: InputMaybe<CategoriesImageType>;
  category_name: Scalars['String']['input'];
  is_available: Scalars['Boolean']['input'];
  is_parent: Scalars['Boolean']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryInputType = {
  category_description: Scalars['String']['input'];
  category_image?: InputMaybe<CategoriesImageType>;
  category_name: Scalars['String']['input'];
  is_available: Scalars['Boolean']['input'];
  is_parent: Scalars['Boolean']['input'];
  parent?: InputMaybe<Scalars['String']['input']>;
};

export type CategoryResponseType = {
  __typename?: 'CategoryResponseType';
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type CategoryType = {
  __typename?: 'CategoryType';
  _id?: Maybe<Scalars['String']['output']>;
  category_description?: Maybe<Scalars['String']['output']>;
  category_image?: Maybe<CategoriesOutputImageType>;
  category_name?: Maybe<Scalars['String']['output']>;
  is_available?: Maybe<Scalars['Boolean']['output']>;
  is_parent?: Maybe<Scalars['Boolean']['output']>;
  parent?: Maybe<CategoryType>;
};

export type CloudinaryInput = {
  public_id: Scalars['String']['input'];
};

export enum CurrencyType {
  Eur = 'EUR',
  Inr = 'INR',
  Usd = 'USD'
}

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

export type ProductImageObjectType = {
  __typename?: 'ProductImageObjectType';
  displayName?: Maybe<Scalars['String']['output']>;
  publicId?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};

export type ProductImageType = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  publicId?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsInputType = {
  colors?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  currency?: InputMaybe<CurrencyType>;
  dimensions?: InputMaybe<Scalars['String']['input']>;
  discount_price?: InputMaybe<Scalars['Float']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  is_new?: InputMaybe<Scalars['Boolean']['input']>;
  material?: InputMaybe<Scalars['String']['input']>;
  model_number?: InputMaybe<Scalars['String']['input']>;
  more_details?: InputMaybe<Array<InputMaybe<MoreInformationType>>>;
  product_category?: InputMaybe<Scalars['String']['input']>;
  product_description: Scalars['String']['input'];
  product_images?: InputMaybe<Array<InputMaybe<ProductImageType>>>;
  product_name: Scalars['String']['input'];
  product_price: Scalars['Float']['input'];
  shipping_dimensions?: InputMaybe<Scalars['String']['input']>;
  shipping_weight?: InputMaybe<Scalars['String']['input']>;
  sizes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  stock_quantity: Scalars['Float']['input'];
  warranty?: InputMaybe<Scalars['String']['input']>;
  weight?: InputMaybe<Scalars['Float']['input']>;
};

export type ProductsType = {
  __typename?: 'ProductsType';
  _id: Scalars['String']['output'];
  colors?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  createdAt?: Maybe<Scalars['String']['output']>;
  currency?: Maybe<CurrencyType>;
  dimensions?: Maybe<Scalars['String']['output']>;
  discount_price?: Maybe<Scalars['Float']['output']>;
  isActive?: Maybe<Scalars['Boolean']['output']>;
  is_new?: Maybe<Scalars['Boolean']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  model_number?: Maybe<Scalars['String']['output']>;
  more_details?: Maybe<Array<Maybe<MoreInformationObjectType>>>;
  product_category?: Maybe<CategoryType>;
  product_description: Scalars['String']['output'];
  product_images?: Maybe<Array<Maybe<ProductImageObjectType>>>;
  product_name: Scalars['String']['output'];
  product_price: Scalars['Float']['output'];
  shipping_dimensions?: Maybe<Scalars['String']['output']>;
  shipping_weight?: Maybe<Scalars['String']['output']>;
  sizes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  stock_quantity: Scalars['Float']['output'];
  warranty?: Maybe<Scalars['String']['output']>;
  weight?: Maybe<Scalars['Float']['output']>;
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

export type UpdateResponseType = {
  __typename?: 'UpdateResponseType';
  category?: Maybe<CategoryType>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

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

export type GetCategoryOneInput = {
  _id: Scalars['String']['input'];
};

export type GetCategoryOneResponseType = {
  __typename?: 'getCategoryOneResponseType';
  category?: Maybe<CategoryType>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GetCategoryResponseType = {
  __typename?: 'getCategoryResponseType';
  category?: Maybe<Array<Maybe<CategoryType>>>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GetColorInput = {
  products_color?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GetColorOutput = {
  __typename?: 'getColorOutput';
  color_name?: Maybe<Scalars['String']['output']>;
};

export type GetColorsResponseType = {
  __typename?: 'getColorsResponseType';
  colors?: Maybe<Array<Maybe<GetColorOutput>>>;
  errors?: Maybe<Array<Maybe<Error>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GetProductOneResponse = {
  __typename?: 'getProductOneResponse';
  errors?: Maybe<Array<Maybe<Error>>>;
  products?: Maybe<ProductsType>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GetProductsOneInput = {
  _id: Scalars['String']['input'];
};

export type GetProductsResponseType = {
  __typename?: 'getProductsResponseType';
  errors?: Maybe<Array<Maybe<Error>>>;
  products?: Maybe<Array<Maybe<ProductsType>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type GetSizeInput = {
  products_size?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type GetSizeOutput = {
  __typename?: 'getSizeOutput';
  size_name?: Maybe<Scalars['String']['output']>;
};

export type GetSizesResponseType = {
  __typename?: 'getSizesResponseType';
  errors?: Maybe<Array<Maybe<Error>>>;
  sizes?: Maybe<Array<Maybe<GetSizeOutput>>>;
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MoreInformationObjectType = {
  __typename?: 'moreInformationObjectType';
  key?: Maybe<Scalars['String']['output']>;
  value?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
};

export type MoreInformationType = {
  key?: InputMaybe<Scalars['String']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'mutation';
  addCategory?: Maybe<CategoryResponseType>;
  addProduct?: Maybe<ResponseType>;
  addProductColor?: Maybe<ResponseType>;
  addProductSize?: Maybe<ResponseType>;
  addUser?: Maybe<AuthPayload>;
  deleteCategory?: Maybe<CategoryResponseType>;
  deleteImage?: Maybe<CategoryResponseType>;
  deleteProduct?: Maybe<ResponseType>;
  getCategoryExcludingCurrent?: Maybe<GetCategoryResponseType>;
  getCategoryOne?: Maybe<GetCategoryOneResponseType>;
  getProductOne?: Maybe<GetProductOneResponse>;
  getUserEmailForVerification?: Maybe<ResponseType>;
  isVerified?: Maybe<ResponseType>;
  login?: Maybe<AuthPayload>;
  resetPassword?: Maybe<ResponseType>;
  resetPasswordMail?: Maybe<ResponseType>;
  updateAccountStatus?: Maybe<ResponseType>;
  updateCategory?: Maybe<UpdateResponseType>;
  updateUserRole?: Maybe<ResponseType>;
  updateUserSettingsForm?: Maybe<ResponseType>;
  verifyOtp?: Maybe<ResponseType>;
};


export type MutationAddCategoryArgs = {
  input?: InputMaybe<CategoryInputType>;
};


export type MutationAddProductArgs = {
  input?: InputMaybe<ProductsInputType>;
};


export type MutationAddProductColorArgs = {
  input?: InputMaybe<GetColorInput>;
};


export type MutationAddProductSizeArgs = {
  input?: InputMaybe<GetSizeInput>;
};


export type MutationAddUserArgs = {
  input?: InputMaybe<AddUsersTypeInput>;
};


export type MutationDeleteCategoryArgs = {
  input?: InputMaybe<GetCategoryOneInput>;
};


export type MutationDeleteImageArgs = {
  input?: InputMaybe<CloudinaryInput>;
};


export type MutationDeleteProductArgs = {
  input?: InputMaybe<GetProductsOneInput>;
};


export type MutationGetCategoryExcludingCurrentArgs = {
  input?: InputMaybe<GetCategoryOneInput>;
};


export type MutationGetCategoryOneArgs = {
  input?: InputMaybe<GetCategoryOneInput>;
};


export type MutationGetProductOneArgs = {
  input?: InputMaybe<GetProductsOneInput>;
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


export type MutationUpdateCategoryArgs = {
  input?: InputMaybe<CategoryEditInputType>;
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
  getCategory?: Maybe<GetCategoryResponseType>;
  getCategoryWithParentTrue?: Maybe<GetCategoryResponseType>;
  getColors?: Maybe<GetColorsResponseType>;
  getProducts?: Maybe<GetProductsResponseType>;
  getSizes?: Maybe<GetSizesResponseType>;
};

export type ResetPasswordType = {
  confirm_password: Scalars['String']['input'];
  new_password: Scalars['String']['input'];
};

export type GetCategoryQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryQuery = { __typename?: 'query', getCategory?: { __typename?: 'getCategoryResponseType', success?: boolean | null, category?: Array<{ __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null, parent?: { __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null } | null } | null> | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type GetCategoryWithParentTrueQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoryWithParentTrueQuery = { __typename?: 'query', getCategoryWithParentTrue?: { __typename?: 'getCategoryResponseType', success?: boolean | null, category?: Array<{ __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null, parent?: { __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null } | null } | null> | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type GetColorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetColorsQuery = { __typename?: 'query', getColors?: { __typename?: 'getColorsResponseType', success?: boolean | null, colors?: Array<{ __typename?: 'getColorOutput', color_name?: string | null } | null> | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type GetProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetProductsQuery = { __typename?: 'query', getProducts?: { __typename?: 'getProductsResponseType', success?: boolean | null, products?: Array<{ __typename?: 'ProductsType', _id: string, product_name: string, product_description: string, stock_quantity: number, product_price: number, discount_price?: number | null, currency?: CurrencyType | null, isActive?: boolean | null, weight?: number | null, dimensions?: string | null, material?: string | null, model_number?: string | null, warranty?: string | null, is_new?: boolean | null, shipping_weight?: string | null, shipping_dimensions?: string | null, createdAt?: string | null, product_category?: { __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null } | null, product_images?: Array<{ __typename?: 'ProductImageObjectType', displayName?: string | null, url?: string | null, publicId?: string | null } | null> | null, more_details?: Array<{ __typename?: 'moreInformationObjectType', key?: string | null, value?: Array<string | null> | null } | null> | null } | null> | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type GetProductOneMutationVariables = Exact<{
  input?: InputMaybe<GetProductsOneInput>;
}>;


export type GetProductOneMutation = { __typename?: 'mutation', getProductOne?: { __typename?: 'getProductOneResponse', success?: boolean | null, products?: { __typename?: 'ProductsType', _id: string, product_name: string, product_description: string, stock_quantity: number, product_price: number, discount_price?: number | null, currency?: CurrencyType | null, isActive?: boolean | null, weight?: number | null, dimensions?: string | null, material?: string | null, model_number?: string | null, warranty?: string | null, is_new?: boolean | null, shipping_weight?: string | null, shipping_dimensions?: string | null, createdAt?: string | null, sizes?: Array<string | null> | null, colors?: Array<string | null> | null, product_category?: { __typename?: 'CategoryType', _id?: string | null, category_name?: string | null, category_description?: string | null, is_available?: boolean | null, is_parent?: boolean | null, category_image?: { __typename?: 'CategoriesOutputImageType', displayName?: string | null, url?: string | null, publicId?: string | null } | null } | null, product_images?: Array<{ __typename?: 'ProductImageObjectType', displayName?: string | null, url?: string | null, publicId?: string | null } | null> | null, more_details?: Array<{ __typename?: 'moreInformationObjectType', key?: string | null, value?: Array<string | null> | null } | null> | null } | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type GetSizesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSizesQuery = { __typename?: 'query', getSizes?: { __typename?: 'getSizesResponseType', success?: boolean | null, sizes?: Array<{ __typename?: 'getSizeOutput', size_name?: string | null } | null> | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'query', ME?: { __typename?: 'MeQueryReturnType', user?: { __typename?: 'User', fullname?: string | null, username?: string | null, email?: string | null, role?: string | null, account_status?: string | null, is_verified?: boolean | null } | null, errors?: Array<{ __typename?: 'Error', message?: string | null, code?: string | null } | null> | null } | null };


export const GetCategoryDocument = gql`
    query GetCategory {
  getCategory {
    success
    category {
      _id
      category_name
      category_description
      category_image {
        displayName
        url
        publicId
      }
      is_available
      is_parent
      parent {
        _id
        category_name
        category_description
        category_image {
          displayName
          url
          publicId
        }
        is_available
        is_parent
      }
    }
    errors {
      message
      code
    }
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a React component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
      }
export function useGetCategoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export function useGetCategorySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryQuery, GetCategoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, options);
        }
export type GetCategoryQueryHookResult = ReturnType<typeof useGetCategoryQuery>;
export type GetCategoryLazyQueryHookResult = ReturnType<typeof useGetCategoryLazyQuery>;
export type GetCategorySuspenseQueryHookResult = ReturnType<typeof useGetCategorySuspenseQuery>;
export type GetCategoryQueryResult = Apollo.QueryResult<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetCategoryWithParentTrueDocument = gql`
    query GetCategoryWithParentTrue {
  getCategoryWithParentTrue {
    category {
      _id
      category_name
      category_description
      category_image {
        displayName
        url
        publicId
      }
      is_available
      is_parent
      parent {
        _id
        category_name
        category_description
        category_image {
          displayName
          url
          publicId
        }
        is_available
        is_parent
      }
    }
    errors {
      message
      code
    }
    success
  }
}
    `;

/**
 * __useGetCategoryWithParentTrueQuery__
 *
 * To run a query within a React component, call `useGetCategoryWithParentTrueQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryWithParentTrueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryWithParentTrueQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCategoryWithParentTrueQuery(baseOptions?: Apollo.QueryHookOptions<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>(GetCategoryWithParentTrueDocument, options);
      }
export function useGetCategoryWithParentTrueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>(GetCategoryWithParentTrueDocument, options);
        }
export function useGetCategoryWithParentTrueSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>(GetCategoryWithParentTrueDocument, options);
        }
export type GetCategoryWithParentTrueQueryHookResult = ReturnType<typeof useGetCategoryWithParentTrueQuery>;
export type GetCategoryWithParentTrueLazyQueryHookResult = ReturnType<typeof useGetCategoryWithParentTrueLazyQuery>;
export type GetCategoryWithParentTrueSuspenseQueryHookResult = ReturnType<typeof useGetCategoryWithParentTrueSuspenseQuery>;
export type GetCategoryWithParentTrueQueryResult = Apollo.QueryResult<GetCategoryWithParentTrueQuery, GetCategoryWithParentTrueQueryVariables>;
export const GetColorsDocument = gql`
    query GetColors {
  getColors {
    success
    colors {
      color_name
    }
    errors {
      message
      code
    }
  }
}
    `;

/**
 * __useGetColorsQuery__
 *
 * To run a query within a React component, call `useGetColorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetColorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetColorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetColorsQuery(baseOptions?: Apollo.QueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
      }
export function useGetColorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
        }
export function useGetColorsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetColorsQuery, GetColorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetColorsQuery, GetColorsQueryVariables>(GetColorsDocument, options);
        }
export type GetColorsQueryHookResult = ReturnType<typeof useGetColorsQuery>;
export type GetColorsLazyQueryHookResult = ReturnType<typeof useGetColorsLazyQuery>;
export type GetColorsSuspenseQueryHookResult = ReturnType<typeof useGetColorsSuspenseQuery>;
export type GetColorsQueryResult = Apollo.QueryResult<GetColorsQuery, GetColorsQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts {
  getProducts {
    success
    products {
      _id
      product_name
      product_description
      stock_quantity
      product_price
      discount_price
      currency
      isActive
      weight
      dimensions
      material
      model_number
      warranty
      is_new
      shipping_weight
      shipping_dimensions
      product_category {
        _id
        category_name
        category_description
        category_image {
          displayName
          url
          publicId
        }
        is_available
        is_parent
      }
      product_images {
        displayName
        url
        publicId
      }
      more_details {
        key
        value
      }
      createdAt
    }
    errors {
      message
      code
    }
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export function useGetProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductOneDocument = gql`
    mutation GetProductOne($input: getProductsOneInput) {
  getProductOne(input: $input) {
    success
    products {
      _id
      product_name
      product_description
      stock_quantity
      product_price
      discount_price
      currency
      isActive
      weight
      dimensions
      material
      model_number
      warranty
      is_new
      shipping_weight
      shipping_dimensions
      product_category {
        _id
        category_name
        category_description
        category_image {
          displayName
          url
          publicId
        }
        is_available
        is_parent
      }
      product_images {
        displayName
        url
        publicId
      }
      more_details {
        key
        value
      }
      createdAt
      sizes
      colors
    }
    errors {
      message
      code
    }
  }
}
    `;
export type GetProductOneMutationFn = Apollo.MutationFunction<GetProductOneMutation, GetProductOneMutationVariables>;

/**
 * __useGetProductOneMutation__
 *
 * To run a mutation, you first call `useGetProductOneMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetProductOneMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getProductOneMutation, { data, loading, error }] = useGetProductOneMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetProductOneMutation(baseOptions?: Apollo.MutationHookOptions<GetProductOneMutation, GetProductOneMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetProductOneMutation, GetProductOneMutationVariables>(GetProductOneDocument, options);
      }
export type GetProductOneMutationHookResult = ReturnType<typeof useGetProductOneMutation>;
export type GetProductOneMutationResult = Apollo.MutationResult<GetProductOneMutation>;
export type GetProductOneMutationOptions = Apollo.BaseMutationOptions<GetProductOneMutation, GetProductOneMutationVariables>;
export const GetSizesDocument = gql`
    query GetSizes {
  getSizes {
    success
    sizes {
      size_name
    }
    errors {
      message
      code
    }
  }
}
    `;

/**
 * __useGetSizesQuery__
 *
 * To run a query within a React component, call `useGetSizesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSizesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSizesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSizesQuery(baseOptions?: Apollo.QueryHookOptions<GetSizesQuery, GetSizesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSizesQuery, GetSizesQueryVariables>(GetSizesDocument, options);
      }
export function useGetSizesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSizesQuery, GetSizesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSizesQuery, GetSizesQueryVariables>(GetSizesDocument, options);
        }
export function useGetSizesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetSizesQuery, GetSizesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSizesQuery, GetSizesQueryVariables>(GetSizesDocument, options);
        }
export type GetSizesQueryHookResult = ReturnType<typeof useGetSizesQuery>;
export type GetSizesLazyQueryHookResult = ReturnType<typeof useGetSizesLazyQuery>;
export type GetSizesSuspenseQueryHookResult = ReturnType<typeof useGetSizesSuspenseQuery>;
export type GetSizesQueryResult = Apollo.QueryResult<GetSizesQuery, GetSizesQueryVariables>;
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