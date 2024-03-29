export const LOADING = "LOADING";
export enum FETCH_ACTIONS {
  ALL_PRODUCTS = "allProducts",
  GET_CATOGERIES = "allCatogeries",
  GET_PROD_BY_ID = "productByID",
}
export enum LOADER_STATES {
  IS_LOADING = "isLoading",
  HAS_LOADED = "hasLoaded",
}

export const CURRENCY_SYMBOL = "$";

export enum CART_ACTIONS {
  ADD = "ADD_TO_CART",
  REMOVE = "REMOVE_FROM_CART",
  INCREASE = "INCREASE_QUANTITY",
  DECREASE = "DECREASE_QUANTITY",
  CLEAR = "CLEAR_CART",
  REPLACE = "REPLACE_CARTITEMS",
}

export enum CURRENT_CATEGORY_ACTIONS {
  EMPTY = "NONE",
  REPLACE = "REPLACE",
}
export enum LISTING_ACTION {
  Append = "AddToList",
  Replace = "ReplaceInList",
  EMPTY = "EmptyList",
}
export enum USER_ACTION {
  REMOVE_CARDS = "REMOVE_USER",
  ADD_CARD = "ADD_CARD",
  ADD_ADDRESS = "ADD_ADDRESS",
  REMOVE_ADDRESS = "REMOVE_ADDRESS",
  EMPTY_CARDS = "EMPTY_CARDS",
  EMPTY_ADDRESS = "EMPTY_ADDRESS",
  REPLACE_ADDRESS = "REPLACE_ADDRESS",
  REPLACE_CARDS = "REPLACE_CARDS",
}
export const LOGIN_USER = "LOGIN_USER";
export enum AUTH_ACTIONS {
  LOGIN_USER = "LOGIN_USER",
  SIGNUP_USER = "SIGN_UP_USER",
}
export const PAGINATION_SIZE = 5;
