import {
  IAddAddressAction,
  IAddCardAction,
  IAddressResponse,
  ICardDetailsResponse,
  IEmptyAddressAction,
  IEmptyCardsAction,
  IRemoveAddressAction,
  IRemoveCardsAction,
  IReplaceAddressAction,
  IReplaceCardsAction,
} from "../../constants/interfaces";
import { USER_ACTION } from "../../constants/names";

export function addCardsAction(card: ICardDetailsResponse): IAddCardAction {
  return {
    type: USER_ACTION.ADD_CARD,
    payload: card,
  };
}
export function replaceCardsAction(
  cardsList: ICardDetailsResponse[]
): IReplaceCardsAction {
  return {
    type: USER_ACTION.REPLACE_CARDS,
    payload: cardsList,
  };
}

export function removeCardsActions(id: number): IRemoveCardsAction {
  return {
    type: USER_ACTION.REMOVE_CARDS,
    payload: {
      id,
    },
  };
}

export function addAddressAction(address: IAddressResponse): IAddAddressAction {
  return {
    type: USER_ACTION.ADD_ADDRESS,
    payload: address,
  };
}
export function replaceAddressAction(
  addressArray: IAddressResponse[]
): IReplaceAddressAction {
  return {
    type: USER_ACTION.REPLACE_ADDRESS,
    payload: addressArray,
  };
}
export function removeAddressAction(addressID: number): IRemoveAddressAction {
  return {
    type: USER_ACTION.REMOVE_ADDRESS,
    payload: {
      id: addressID,
    },
  };
}

export function emptyCardsAction(): IEmptyCardsAction {
  return {
    type: USER_ACTION.EMPTY_CARDS,
  };
}
export function emptyAddressAction(): IEmptyAddressAction {
  return {
    type: USER_ACTION.EMPTY_ADDRESS,
  };
}
