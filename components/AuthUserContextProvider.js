import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase";

const AuthUserContext = createContext(null);

export const AuthUserContextProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSession(supabaseClient.auth.session());
    setUser(supabaseClient.auth.session() || null);
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      console.log("_event: ", _event);
      setSession(session);
    });
  }, [router]);

  // if there's a session, we want to query for they user in our db
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch("/api/users");
        console.log("response: ", response);
      } catch (error) {
        console.log("FETCH USER ERROR: ", error);
      }
    }

    if (session) {
      fetchUser();
    }
  }, [session]);

  const logOut = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      console.log("A DIFFERENT SIGNOUT ERROR: ", error);
    } catch (error) {
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

  // they landed on the /, and they are logged in?
  // they went to /login and logged in
  const contextValue = {
    logOut,
    session,
    setSession,
    user,
    setUser,
  };
  return (
    <AuthUserContext.Provider value={contextValue}>
      {children}
    </AuthUserContext.Provider>
  );
};

// custom sweet hook we can use to access context anywhere within the scope of the context provider
// we're gonna put this context provider in _App.js
export const useAuthUserContext = () => useContext(AuthUserContext);
