import { useContext } from "react";
import BaseStructure from "./BaseStructure";
import { UserContext, UserContextType } from "../../contexts/UserContext";

export default function OwnerPage() {
  const { userInfo } = useContext(UserContext) as UserContextType;
  const user = userInfo.user;

  return <BaseStructure>owner</BaseStructure>;
}
