import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase";

const AuthUserContext = createContext(null);

export const AuthUserContextProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const [isFetchingUser, setIsFetchingUser] = useState(true);
  // console.log('session in AuthContext', session)
  // console.log('user', user)
  // console.log('isfetchinguser value', isFetchingUser)


  useEffect(() => {
    const currentSession = supabaseClient.auth.session()

    if (!currentSession) {
      console.log("in if block")
      router.push('/login')
      return
    }
    setSession(currentSession);

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      console.log('session in set session useeffect', session)
      setSession(session);
    });
  }, [router, session]);

  useEffect(() => {
    if (user) {
      setIsFetchingUser(false)
    }
  }, [user])


  // if there's a session, we want to query for they user in our db
  useEffect(() => {
    async function fetchUser() {
      try {
        // console.log("in fetch user user effect")
        const body = {
          user: session?.user,
        };
        const response = await fetch("/api/users", {
          method: "POST",
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
        });

        const [user, isNewUser] = await response.json();

        setUser(user);
        if (isNewUser) {
          setIsNewUser(true);
        }

      } catch (error) {
        console.log("FETCH USER ERROR: ", error);
        setIsFetchingUser(false);
      }
    }

    if (session) {
      fetchUser();
    }
  }, [session]);

  const logOut = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      setUser(null);
      setSession(null);
    } catch (error) {
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

  const Loading = () => {
    return <div>Loading...</div>;
  };

  // they landed on the /, and they are logged in?
  // they went to /login and logged in
  const contextValue = {
    logOut,
    session,
    setSession,
    user,
    setUser,
    isNewUser,
  };
  return (
    <AuthUserContext.Provider value={contextValue}>
      {isFetchingUser ? <Loading /> : children}
    </AuthUserContext.Provider>
  );
};



// custom sweet hook we can use to access context anywhere within the scope of the context provider
// we're gonna put this context provider in _App.js
export const useAuthUserContext = () => useContext(AuthUserContext);
