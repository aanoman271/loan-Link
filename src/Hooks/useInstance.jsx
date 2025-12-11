import axios from "axios";
import { useMemo } from "react";
const useInstance = () => {
  const instance = useMemo(() => {
    const newInstance = axios.create({
      baseURL: "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return newInstance;
  }, []);

  return instance;
};

export default useInstance;
