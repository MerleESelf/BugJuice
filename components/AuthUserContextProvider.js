import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabaseClient } from "../lib/supabase";
import { Loading } from "./Loading";

const AuthUserContext = createContext(null);

export const AuthUserContextProvider = ({ children }) => {
  const router = useRouter();
  const [session, setSession] = useState(supabaseClient.auth.session());
  const [user, setUser] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const [isFetchingUser, setIsFetchingUser] = useState(true);

  useEffect(() => {
    if (!session) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      switch (_event) {
        case "SIGNED_IN": {
          setSession(session);
          router.push("/");
          break;
        }
        case "SIGNED_OUT": {
          setSession(null);
          router.push("/login");
          break;
        }
        default:
          throw new Error(`Invalid _event: ${_event}`);
      }
    });
  }, [router, session]);

  useEffect(() => {
    if (user) {
      setIsFetchingUser(false);
    }
  }, [user]);

  useEffect(() => {
    async function fetchUser() {
      try {
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
      setUser(null);
      setSession(null);
    } catch (error) {
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

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
      {isFetchingUser ? <div className="flex flex-col items-center content-center w-full h-full"> <Loading /> </div> : children}
    </AuthUserContext.Provider>
  );
};
AuthUserContextProvider.propTypes = {
  children: PropTypes.object
};

export const useAuthUserContext = () => useContext(AuthUserContext);