import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import firebase from "../firebase/firebase.initalize";

firebase();
const AuthContext = React.createContext();

// create Auth Context function
export function useAuth() {
  return useContext(AuthContext);
}

// create Auth Provider function
export function AuthProvider(children) {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // signup function
  async function signup(auth, name, email, password) {
    await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    const user = auth.currentUser;

    setCurrentUser({
      ...user,
    });
  }

  // login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout function
  const logout = () => {
    return signOut(auth);
  };

  const value = {
    signup,
    login,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
