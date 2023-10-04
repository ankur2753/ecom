import {
  IAddItemsToListAction,
  IEmptyItemFromListAction,
  IProduct,
  IReplaceItemFromListAction,
} from "../../constants/interfaces";
import { LISTING_ACTION } from "../../constants/names";

export default function ItemListingReducer(
  state: IProduct[] = [],
  action:
    | IAddItemsToListAction
    | IReplaceItemFromListAction
    | IEmptyItemFromListAction
): IProduct[] {
  switch (action.type) {
    case LISTING_ACTION.Append:
      return [...state, ...action.payload];
    case LISTING_ACTION.EMPTY:
      return [];
    case LISTING_ACTION.Replace:
      return [...action.payload];
    default:
      return state;
  }
}
