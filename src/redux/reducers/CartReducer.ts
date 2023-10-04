import {
  IAddToCartAction,
  ICartItem,
  IClearCartAction,
  IDecreaseQuantityInCartAction,
  IIncreaseQuantityInCartAction,
  IProduct,
  IReduxState,
  IRemoveFromCartAction,
  IReplaceCartAction,
} from "../../constants/interfaces";
import { CART_ACTIONS } from "../../constants/names";

export default function CartReducer(
  state: ICartItem[] = [],
  action:
    | IAddToCartAction
    | IDecreaseQuantityInCartAction
    | IIncreaseQuantityInCartAction
    | IRemoveFromCartAction
    | IClearCartAction
    | IReplaceCartAction
): ICartItem[] {
  switch (action.type) {
    case CART_ACTIONS.ADD:
      if (state.some((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];
    case CART_ACTIONS.DECREASE:
      return state.map((item) => {
        if (item.id === action.payload.id && item.quantity > 1)
          item.quantity -= 1;
        return item;
      });
    case CART_ACTIONS.INCREASE:
      return state.map((item) => {
        if (item.id === action.payload.id) item.quantity += 1;
        return item;
      });
    case CART_ACTIONS.REMOVE:
      return state.filter((item) => item.id !== action.payload.id);
    case CART_ACTIONS.CLEAR:
      return [];
    case CART_ACTIONS.REPLACE:
      return action.payload;
    default:
      return state;
  }
}
