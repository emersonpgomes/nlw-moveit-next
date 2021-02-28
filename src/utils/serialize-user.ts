import { IUser } from "../contexts/user";

export function seralizeUser(user: IUser) {
  return btoa(JSON.stringify(user));
}
