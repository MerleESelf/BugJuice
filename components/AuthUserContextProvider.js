import Router, { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useSupabaseClient, useSession, useUser } from '@supabase/auth-helpers-react'
import { Loading } from "./Loading";

const AuthUserContext = createContext(null);

export const AuthUserContextProvider = ({ children }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient()

  // use this user to query our db for bug-juice user
  // const supabaseUser = useUser()

  // this user is passed down via this context to app, this is not the supabase user
  // this is our db user ??maybe we dont need??
  const [user, setUser] = useState(null)
  const session = useSession()
  const [isNewUser, setIsNewUser] = useState(false);

  const [isFetchingUser, setIsFetchingUser] = useState(true)

  console.log(router)
  useEffect(() => {
    const url = router.asPath
    if (!url.includes('access_token') && !session) {
      router.push('/login')
    }
  }, [session, router])


  useEffect(() => {
    supabaseClient.auth.onAuthStateChange((event) => {
      switch (event) {
        case "SIGNED_IN": {
          router.push("/");
          break;
        }
        case "SIGNED_OUT": {
          router.push("/login");
          break;
        }
        default:
          throw new Error(`Invalid _event: ${event}`);
      }
    });
  }, [router, supabaseClient.auth]);

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
        // find or create user in our db
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
      // if there is a session, we want to get user from db
      fetchUser();
    }
  }, [session]);

  const logOut = async () => {
    try {
      await supabaseClient.auth.signOut()
    } catch (error) {
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

  const contextValue = {
    logOut,
    isNewUser,
    user,
  };
  return (
    <AuthUserContext.Provider value={contextValue}>
      {/* {isFetchingUser ? <div className="flex flex-col items-center content-center w-full h-full"> <Loading /> </div> : children} */}
      {children}
    </AuthUserContext.Provider>
  );
};
AuthUserContextProvider.propTypes = {
  children: PropTypes.object
};

export const useAuthUserContext = () => useContext(AuthUserContext);