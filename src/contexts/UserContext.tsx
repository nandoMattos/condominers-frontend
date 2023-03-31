import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export type User = {
  id: number;
  name: string;
  email: string;
  type: string;
};

export type UserInfoType = {
  token: string;
  user: User;
};

export type UserContextType = {
  userInfo: UserInfoType;
  setUserInfo: Dispatch<SetStateAction<User>>;
};

export const UserContext = createContext({});

type UserProviderProps = {
  children: ReactNode;
};

export default function UserProvider({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
