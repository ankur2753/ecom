import {
  IAddToCartAction,
  ICartItem,
  IClearCartAction,
  IDecreaseQuantityInCartAction,
  IIncreaseQuantityInCartAction,
  IProduct,
  IRemoveFromCartAction,
  IReplaceCartAction,
} from "../../constants/interfaces";
import { CART_ACTIONS } from "../../constants/names";

export function addToCart(product: IProduct): IAddToCartAction {
  return {
    type: CART_ACTIONS.ADD,
    payload: {
      id: product.id,
      image: product.image,
      quantity: 1,
      title: product.title,
      price: product.price,
    },
  };
}

export function removeFromCart(id: number): IRemoveFromCartAction {
  return {
    type: CART_ACTIONS.REMOVE,
    payload: {
      id,
    },
  };
}

export function increaseQuantityInCart(
  id: number
): IIncreaseQuantityInCartAction {
  return {
    type: CART_ACTIONS.INCREASE,
    payload: {
      id,
    },
  };
}

export function decreaseQuantityInCart(
  id: number
): IDecreaseQuantityInCartAction {
  return {
    type: CART_ACTIONS.DECREASE,
    payload: {
      id,
    },
  };
}

export function clearCart(): IClearCartAction {
  return {
    type: CART_ACTIONS.CLEAR,
  };
}

export function replaceCartItems(newItems: ICartItem[]): IReplaceCartAction {
  return {
    type: CART_ACTIONS.REPLACE,
    payload: newItems,
  };
}
