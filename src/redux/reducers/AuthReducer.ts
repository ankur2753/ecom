import { ILoginUserAction, IUser } from "../../constants/interfaces";
import { AUTH_ACTIONS, USER_ACTION } from "../../constants/names";

export default function (
  state: number | null = null,
  action: ILoginUserAction
): number | null {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_USER:
      return action.payload.id;
    default:
      return state;
  }
}
