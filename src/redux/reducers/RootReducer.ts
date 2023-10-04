import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import CartReducer from "./CartReducer";
import CurrItemReducer from "./CurrentCategoryReducer";
import ItemListingReducer from "./ItemListingReducer";
import LoaderReducer from "./LoaderReducer";
import UserInfoReducer from "./UserReducer";

const RootReducer = combineReducers({
  Cart: CartReducer,
  Loader: LoaderReducer,
  List: ItemListingReducer,
  CurrentItem: CurrItemReducer,
  UserInfo: UserInfoReducer,
  UserId: AuthReducer,
});
export default RootReducer;
