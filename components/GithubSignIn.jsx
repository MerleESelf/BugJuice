import React from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabase";

export const GithubSignIn = () => {
  const router = useRouter();
  async function handleOAuthLogin() {
    let { error } = await supabaseClient.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_CALLBACK_URL
      }
    });
    if (error) console.log("Error: ", error.message);
    else {
      router.push("/");
    }
  }


  return (
    <div
      className="flex flex-col text-4xl"
    >
      <button onClick={handleOAuthLogin}
        className="m-5 btn btn-ghost"
      >
        Sign In With GitHub
      </button>
    </div>
  );
};
