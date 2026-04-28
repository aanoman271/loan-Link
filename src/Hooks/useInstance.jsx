import axios from "axios";
import { useMemo } from "react";
const useInstance = () => {
  const instance = useMemo(() => {
    const newInstance = axios.create({
      baseURL: "https://loanlink-server-eight.vercel.app",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return newInstance;
  }, []);

  return instance;
};

export default useInstance;
