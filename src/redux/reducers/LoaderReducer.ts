import {
  IRemoveLoaderAction,
  ISetLoaderAction,
} from "../../constants/interfaces";
import { LOADER_STATES } from "../../constants/names";

export default function LoaderReducer(
  state: boolean = false,
  action: ISetLoaderAction | IRemoveLoaderAction
) {
  switch (action.type) {
    case LOADER_STATES.IS_LOADING:
      return true;
    case LOADER_STATES.HAS_LOADED:
      return false;
    default:
      return false;
  }
}
