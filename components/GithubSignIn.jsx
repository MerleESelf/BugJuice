import React from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

export const GithubSignIn = () => {
  const supabaseClient = useSupabaseClient()

  async function handleOAuthLogin() {
    // TODO: add try / catch here
    let { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL
      }
    });
    if (error) console.log("Error: ", error.message);
  }


  return (
    <div className="flex flex-col text-4xl">
      <button onClick={handleOAuthLogin} className="m-5 btn btn-ghost">
        Sign In With GitHub
      </button>
    </div>
  );
};
