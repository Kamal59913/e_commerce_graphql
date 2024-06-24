import ResponseType from "../users/types/ResponseType";
import addProduct from "./resolvers/addProduct";
import { ProductsInputType } from "./types/productsInputType";

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
};
