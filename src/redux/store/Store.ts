import { createStore, applyMiddleware } from "redux";
import { IReduxState } from "../../constants/interfaces";
import RootReducer from "../reducers/RootReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const initailState: IReduxState = {
  Cart: [],
  currentItem: null,
  Loader: false,
  UserId: 0,
  List: [],
  UserInfo: {
    Address: [],
    Cards: [],
  },
};

export default createStore(RootReducer, initailState, composeWithDevTools());
