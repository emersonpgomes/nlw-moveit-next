import { IUser } from "../contexts/user";

export function deseralizeUser(user?: string) {
  if (!user) return null;

  try {
    return (JSON.parse(Buffer.from(user, 'base64').toString('ascii')) as unknown) as IUser;
  } catch (err) {
    console.log(err.message)
    return null;
  }
}
