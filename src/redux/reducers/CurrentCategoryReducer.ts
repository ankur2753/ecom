import {
  IAddCurrrentItemAction,
  IProduct,
  IRemoveCurrentItemAction,
} from "../../constants/interfaces";
import { CURRENT_CATEGORY_ACTIONS } from "../../constants/names";

export default function CurrItemReducer(
  state: IProduct | null,
  action: IAddCurrrentItemAction | IRemoveCurrentItemAction
): IProduct | null {
  switch (action.type) {
    case CURRENT_CATEGORY_ACTIONS.REPLACE:
      return action.payload;
    case CURRENT_CATEGORY_ACTIONS.EMPTY:
      return null;
    default:
      return null;
  }
}
