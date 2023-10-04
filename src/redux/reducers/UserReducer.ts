import {
  IAddAddressAction,
  IAddCardAction,
  IEmptyAddressAction,
  IEmptyCardsAction,
  IRemoveAddressAction,
  IRemoveCardsAction,
  IReplaceAddressAction,
  IReplaceCardsAction,
  IUserDetails,
  IUserInfo,
} from "../../constants/interfaces";
import { USER_ACTION } from "../../constants/names";
const defaultData: IUserDetails = {
  Address: [],
  Cards: [],
};
export default function UserInfoReducer(
  state: IUserDetails = defaultData,
  action:
    | IAddCardAction
    | IRemoveCardsAction
    | IAddAddressAction
    | IRemoveAddressAction
    | IEmptyAddressAction
    | IEmptyCardsAction
    | IReplaceAddressAction
    | IReplaceCardsAction
): IUserDetails {
  switch (action.type) {
    case USER_ACTION.ADD_CARD:
      return {
        Address: [...state.Address],
        Cards: [...state.Cards, action.payload],
      };
    case USER_ACTION.REPLACE_CARDS:
      return {
        Address: [...state.Address],
        Cards: action.payload,
      };
    case USER_ACTION.REPLACE_ADDRESS:
      return {
        Address: action.payload,
        Cards: [...state.Cards],
      };
    case USER_ACTION.REMOVE_CARDS:
      return {
        Address: [...state.Address],
        Cards: state.Cards.filter((card) => card.id !== action.payload.id),
      };
    case USER_ACTION.ADD_ADDRESS:
      return {
        Address: [...state.Address, action.payload],
        Cards: [...state.Cards],
      };
    case USER_ACTION.REMOVE_ADDRESS:
      return {
        Address: state.Address.filter(
          (address) => address.id !== action.payload.id
        ),
        Cards: [...state.Cards],
      };
    case USER_ACTION.EMPTY_ADDRESS:
      return {
        Address: [],
        Cards: [...state.Cards],
      };
    case USER_ACTION.EMPTY_CARDS:
      return {
        Address: [...state.Address],
        Cards: [],
      };
    default:
      return state;
  }
}
