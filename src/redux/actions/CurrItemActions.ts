import {
  IAddCurrrentItemAction,
  IProduct,
  IRemoveCurrentItemAction,
} from "../../constants/interfaces";
import { CURRENT_CATEGORY_ACTIONS } from "../../constants/names";

export function setCurrentItem(item: IProduct): IAddCurrrentItemAction {
  return {
    type: CURRENT_CATEGORY_ACTIONS.REPLACE,
    payload: item,
  };
}
export function removeCurrentItem(): IRemoveCurrentItemAction {
  return {
    type: CURRENT_CATEGORY_ACTIONS.EMPTY,
  };
}
