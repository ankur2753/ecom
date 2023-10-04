import { Url } from "url";
import {
  AUTH_ACTIONS,
  CART_ACTIONS,
  CURRENT_CATEGORY_ACTIONS,
  FETCH_ACTIONS,
  LISTING_ACTION,
  LOADER_STATES,
  USER_ACTION,
} from "./names";

export interface IFetchAllProductsAction {
  type: FETCH_ACTIONS.ALL_PRODUCTS;
}

export interface IFetchProductCatogeriesAction {
  type: FETCH_ACTIONS.GET_CATOGERIES;
}

export interface IFetchProductByID {
  type: FETCH_ACTIONS.GET_PROD_BY_ID;
  payload: {
    id: number;
  };
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface IUserInfo {
  email: string;
  phone: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    street: string;
    zipcode: string;
  };
}
export interface IUser extends IUserInfo {
  id: number;
  username: string;
  password: string;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      long: string;
      lat: string;
    };
  };
  __v: number;
}

export interface IReduxState {
  UserId: number;
  Cart: ICartItem[];
  currentItem: IProduct | null;
  Loader: boolean;
  List: IProduct[];
  UserInfo: IUserDetails;
}
export interface ICartItem {
  id: number;
  quantity: number;
  title: string;
  image: string;
  price: number;
}

export interface IAddToCartAction {
  type: CART_ACTIONS.ADD;
  payload: ICartItem;
}
export interface IReplaceCartAction {
  type: CART_ACTIONS.REPLACE;
  payload: ICartItem[];
}

export interface IRemoveFromCartAction {
  type: CART_ACTIONS.REMOVE;
  payload: {
    id: number;
  };
}

export interface ILoginUserAction {
  type: AUTH_ACTIONS.LOGIN_USER;
  payload: {
    id: number;
  };
}

export interface IDecreaseQuantityInCartAction {
  type: CART_ACTIONS.DECREASE;
  payload: {
    id: number;
  };
}
export interface IEmptyCartAction {
  type: CART_ACTIONS.CLEAR;
}

export interface IIncreaseQuantityInCartAction {
  type: CART_ACTIONS.INCREASE;
  payload: {
    id: number;
  };
}
export interface IAddCurrrentItemAction {
  type: CURRENT_CATEGORY_ACTIONS.REPLACE;
  payload: IProduct;
}
export interface IRemoveCurrentItemAction {
  type: CURRENT_CATEGORY_ACTIONS.EMPTY;
}
export interface IClearCartAction {
  type: CART_ACTIONS.CLEAR;
}

export interface ISetLoaderAction {
  type: LOADER_STATES.IS_LOADING;
}
export interface IRemoveLoaderAction {
  type: LOADER_STATES.HAS_LOADED;
}
export interface IAddItemsToListAction {
  type: LISTING_ACTION.Append;
  payload: IProduct[];
}
export interface IReplaceItemFromListAction {
  type: LISTING_ACTION.Replace;
  payload: IProduct[];
}
export interface IEmptyItemFromListAction {
  type: LISTING_ACTION.EMPTY;
}
export interface IEmptyAddressAction {
  type: USER_ACTION.EMPTY_ADDRESS;
}
export interface IEmptyCardsAction {
  type: USER_ACTION.EMPTY_CARDS;
}
export interface IAddCardAction {
  type: USER_ACTION.ADD_CARD;
  payload: ICardDetailsResponse;
}
export interface IReplaceCardsAction {
  type: USER_ACTION.REPLACE_CARDS;
  payload: ICardDetailsResponse[];
}
export interface IRemoveCardsAction {
  type: USER_ACTION.REMOVE_CARDS;
  payload: {
    id: number;
  };
}
export interface IRemoveAddressAction {
  type: USER_ACTION.REMOVE_ADDRESS;
  payload: {
    id: number;
  };
}

export interface IAddAddressAction {
  type: USER_ACTION.ADD_ADDRESS;
  payload: IAddressResponse;
}
export interface IReplaceAddressAction {
  type: USER_ACTION.REPLACE_ADDRESS;
  payload: IAddressResponse[];
}

export interface IproductWithQuantity extends IProduct {
  quantity: number;
}

export interface ICartResponse {
  products: IproductWithQuantity[];
  id: number;
  userID: number;
  isActive: boolean;
}

export interface IAddressResponse {
  city: string;
  street: string;
  state: string;
  id: number;
  userID: number;
}
export interface ICardDetailsResponse {
  id: number;
  cardNo: number;
  cvv: number;
  expDate: string;
  userID: number;
}

export interface IUserDetails {
  Cards: ICardDetailsResponse[];
  Address: IAddressResponse[];
}
