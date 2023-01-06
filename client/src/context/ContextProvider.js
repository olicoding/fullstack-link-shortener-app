import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const Context = createContext();

function ContextProvider({ children }) {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const response = await axios.get("/api/list");
        const documents = response.data;

        setDocs((prev) => [...prev, ...documents?.links]);
      } catch (err) {
        console.log("Error on links fetch: ", err.message);
      }
    };

    fetchDocs();
  }, []);

  return (
    <Context.Provider value={{ docs, setDocs }}>{children}</Context.Provider>
  );
}

export default ContextProvider;
