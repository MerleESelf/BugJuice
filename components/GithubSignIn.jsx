import React, { useState } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { ErrorModal } from "./ErrorModal";


export const GithubSignIn = () => {
  const supabaseClient = useSupabaseClient()
  const [isSignInErrorModalOpen, setIsSignInErrorModalOpen] = useState(false)

  async function handleOAuthLogin() {
    try {
      let { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL
        }
      });
      if (error) {
        throw Error(error.message)
      }
    } catch (err) {
      // Scenario: if a user clicks Sign In w/ Github and oauth breaks for some reason
      setIsSignInErrorModalOpen(true)
      console.log('[SUPABASE SIGN_IN_WITH_OAUTH ERROR]: ', err)
    }
  }


  return (
    <div className="flex flex-col text-4xl">
      <button onClick={handleOAuthLogin} className="m-5 btn btn-ghost">
        Sign In With GitHub
      </button>
      <ErrorModal isOpen={isSignInErrorModalOpen} />
    </div>
  );
};
