import axios from "axios";
import {
  IAddItemsToListAction,
  IFetchAllProductsAction,
  IFetchProductByID,
  IFetchProductCatogeriesAction,
  ILoginUserAction,
  IProduct,
  IReplaceItemFromListAction,
  IUser,
} from "../../constants/interfaces";
import { BASE_URL } from "../../constants/links";
import {
  AUTH_ACTIONS,
  FETCH_ACTIONS,
  LISTING_ACTION,
  USER_ACTION,
} from "../../constants/names";
import { setLoader, removeLoader } from "./LoaderActions";

export function getAllProductsAction() {
  return async function (dispatch: any) {
    dispatch(setLoader());
    let url = BASE_URL + "products/";
    const response = await axios.get(url);
    dispatch(removeLoader());
    dispatch(replaceListAction(response.data));
  };
}
export function getCatogeriesAction(): IFetchProductCatogeriesAction {
  return {
    type: FETCH_ACTIONS.GET_CATOGERIES,
  };
}

export function getProductByIdAction(id: number): IFetchProductByID {
  return {
    type: FETCH_ACTIONS.GET_PROD_BY_ID,
    payload: {
      id: id,
    },
  };
}

export function AppendToListAction(items: IProduct[]): IAddItemsToListAction {
  return {
    type: LISTING_ACTION.Append,
    payload: items,
  };
}

export function replaceListAction(
  items: IProduct[]
): IReplaceItemFromListAction {
  return {
    type: LISTING_ACTION.Replace,
    payload: items,
  };
}

export function loginUserAction(id: number): ILoginUserAction {
  return {
    type: AUTH_ACTIONS.LOGIN_USER,
    payload: {
      id: id,
    },
  };
}
