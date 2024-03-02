import { createContext } from "react";
import { useState } from "react";
export const Data = createContext([]);

export default function DataCartProvider({ children }) {
  const [Data1, setData] = useState([]);
  return <Data.Provider value={{ Data1, setData }}>{children}</Data.Provider>;
}
