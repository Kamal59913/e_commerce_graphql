import ResponseType from "../users/types/ResponseType";
import addProduct from "./resolvers/addProduct";
import deleteProduct from "./resolvers/deleteProduct";
import getProductsResolver from "./resolvers/getProducts";
import { getProductsOneInput } from "./types/getProductOneInput";
import getProductsResponseType from "./types/getProductsResponseType";
import { ProductsInputType } from "./types/productsInputType";

export const productsQuery = {
  getProducts : {
    type: getProductsResponseType,
    resolve: getProductsResolver
  }
}

export const productMutation = {
  addProduct: {
    type: ResponseType,
    args: {
      input: {
          type: ProductsInputType
      }
    },
    resolve: addProduct,
  },

  deleteProduct: {
    type: ResponseType,
    args: {
      input: {
        type: getProductsOneInput
      }
    },
    resolve: deleteProduct
  }
};
