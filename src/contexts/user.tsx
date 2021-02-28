import { createContext, ReactNode, useState } from "react";

export interface IUser {
  id: number;
  name: string;
  username: string,
  avatarUrl: string,
  userProfileUrl: string,
}

export interface UserContextData {
  user: IUser;
  setUser(user: IUser): void;
}

export const UserContext = createContext({} as UserContextData);

export interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState({} as IUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
