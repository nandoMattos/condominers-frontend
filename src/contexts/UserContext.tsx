import { createContext, type Dispatch, type ReactNode, type SetStateAction } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

export interface User {
  id: number
  name: string
  email: string
  ownerToken?: string
}

export interface UserInfoType {
  token: string
  user: User
}

export interface UserContextType {
  userInfo: UserInfoType
  setUserInfo: Dispatch<SetStateAction<User>>
}

export const UserContext = createContext({});

interface UserProviderProps {
  children: ReactNode
}

export default function UserProvider ({ children }: UserProviderProps) {
  const [userInfo, setUserInfo] = useLocalStorage("userInfo", {});

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
