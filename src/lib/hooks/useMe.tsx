import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export const useMe = () => {
  const { me } = useContext(UserContext);
  return me;
};
