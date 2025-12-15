// useAxiosSecure.jsx (সঠিক সংশোধন)
import { useEffect } from "react";
import useInstance from "./useInstance";
import useAuth from "./useAuth";
const useAxiosSecure = () => {
  const instance = useInstance();
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = instance.interceptors.request.use(
      async (config) => {
        if (user) {
          try {
            const idToken = await user.getIdToken(true);

            config.headers.Authorization = `Bearer ${idToken}`;
          } catch (error) {
            console.error("Error fetching Firebase ID token:", error);
          }
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
  }, [user, instance]);

  return instance;
};

export default useAxiosSecure;
