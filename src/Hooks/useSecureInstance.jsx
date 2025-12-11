import { useEffect } from "react";
import useAuth from "./useAuth";
import useInstance from "./useInstance";

const useAxiosSecure = () => {
  const instance = useInstance();
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.Authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      instance.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return instance;
};

export default useAxiosSecure;
