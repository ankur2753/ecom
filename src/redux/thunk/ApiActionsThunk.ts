import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { removeLoader, setLoader } from "../actions/LoaderActions";
export default 1;

export function getAllProducts() {
  return function (dispatch: Dispatch<AnyAction>) {
    dispatch(setLoader());
    const response = axios
      .get("https://fakestoreapi.com/products/")
      .then((data) => console.log(data))
      .finally(() => dispatch(removeLoader()));
  };
}
