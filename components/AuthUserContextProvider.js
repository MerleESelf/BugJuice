import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect } from "react";
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'

const AuthUserContext = createContext(null);

export const AuthUserContextProvider = ({ children }) => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient()
  const session = useSession()

  useEffect(() => {
    const url = router.asPath
    if (!url.includes('access_token') && !session) {
      router.push('/login')
    }
  }, [session, router])


  const logOut = async () => {
    try {
      await supabaseClient.auth.signOut()
    } catch (error) {
      console.log("ERROR SIGNING OUT: ", error);
    }
  };

  const contextValue = {
    logOut,

  };
  return (
    <AuthUserContext.Provider value={contextValue}>

      {children}
    </AuthUserContext.Provider>
  );
};
AuthUserContextProvider.propTypes = {
  children: PropTypes.object
};

export const useAuthUserContext = () => useContext(AuthUserContext);