import React, { useEffect, useState } from "react";

import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebaseConfiq/fireBaseConfiq";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoadding, setAuthLoadding] = useState(true);
  const [FetchLoadding, setFetchLoadding] = useState(true);
  const provider = new GoogleAuthProvider();

  // signIn with Google
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };
  // create user with email
  const createUser = async (email, password) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateuser = async (userInfo) => {
    return await updateProfile(auth.currentUser, userInfo);
  };
  const logOut = () => {
    return signOut(auth);
  };

  // UserManage

  useEffect(() => {
    const unsubsCribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("current userInfo", currentUser || "empty");

      setUser(currentUser);
      setAuthLoadding(false);
    });

    return () => {
      unsubsCribe();
    };
  }, []);

  // db users data fetch

  const authInfo = {
    user,
    authLoadding,
    setAuthLoadding,
    FetchLoadding,
    setFetchLoadding,
    setUser,
    signInUser,
    updateuser,
    createUser,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
