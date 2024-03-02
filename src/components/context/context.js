import { createContext } from "react";
import { useState } from "react";
export const User = createContext();

export default function UserProvider({ children }) {
  const [User1, SetUser1] = useState("");
  return <User.Provider value={{ User1, SetUser1 }}>{children}</User.Provider>;
}
