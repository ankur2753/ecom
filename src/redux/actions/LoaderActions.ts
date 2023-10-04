import {
  IRemoveLoaderAction,
  ISetLoaderAction,
} from "../../constants/interfaces";
import { LOADER_STATES } from "../../constants/names";

export function setLoader(): ISetLoaderAction {
  return {
    type: LOADER_STATES.IS_LOADING,
  };
}

export function removeLoader(): IRemoveLoaderAction {
  return {
    type: LOADER_STATES.HAS_LOADED,
  };
}
