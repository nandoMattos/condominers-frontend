import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export default function HomePage() {
  const { user } = useContext(UserContext);

  console.log(user);
  return <>home</>;
}
