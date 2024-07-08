import ResponseType from "../users/types/ResponseType";
import addColorResolver from "./resolvers/addColor.resolver";
import addProduct from "./resolvers/addProduct";
import addSizeResolver from "./resolvers/addSize.resolver";
import deleteProduct from "./resolvers/deleteProduct";
import getProductsResolver from "./resolvers/getProducts";
import { getColorInput, getSizeInput } from "./types/colorsAndSize.type";
import { getProductsOneInput } from "./types/getProductOneInput";
import getProductsResponseType from "./types/getProductsResponseType";
import { ProductsInputType } from "./types/productsInputType";
import getColorsResponseType from "./types/getColorsResponseType.type";
import getSizesResponseType from "./types/getSizesResponseType.type";
import { resolve } from "path";
import { getColorsResolver, getSizesResolver} from "./resolvers/getColorSizesResolver.resolver";
import getProductsOneResolver from "./resolvers/getProductsOneResolver";

export const productsQuery = {
  getProducts : {
    type: getProductsResponseType,
    resolve: getProductsResolver
  },
  getColors: {
    type: getColorsResponseType,
    resolve: getColorsResolver
  },
  getSizes: {
    type: getSizesResponseType,
    resolve: getSizesResolver
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
  },

  addProductSize: {
    type: ResponseType,
    args: {
      input: {
        type: getSizeInput
      }
    },
    resolve: addSizeResolver
  },

  addProductColor: {
    type: ResponseType,
    args: {
      input: {
        type: getColorInput
      }
    },
    resolve: addColorResolver
  },

  getProductOne: {
    type: ResponseType,
    args: {
      input: {
        type: getProductsOneInput
      },
    },
    resolve: getProductsOneResolver
  }
};
