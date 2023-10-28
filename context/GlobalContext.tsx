import Loading from "@/components/Loading";
import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Data } from "types";

interface IGlobalContext {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

const GlobalContext = createContext({} as IGlobalContext);

interface Props {
  children: React.ReactNode | React.ReactNode[];
}

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<Data>({
    registeredCount: 0,
    students: [],
    waiting: [],
    waitingCount: 0,
    studentCount: 0,
    studentAddedThisMonth: 0,
  } as Data);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get("/api/getdata");
        setData(res.data);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.log(e);
      }
    })();
  }, []);
  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {loading ? <Loading /> : children}
    </GlobalContext.Provider>
  );
};
