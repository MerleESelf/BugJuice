import React from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabase";

export const GithubSignIn = () => {
  const router = useRouter();
  async function handleOAuthLogin() {
    let { error } = await supabaseClient.auth.signIn({
      provider: "github",
    });
    if (error) console.log("Error: ", error.message);
    else router.push("/my-todos");
  }
  async function handleOAuthLogout() {
    let { error } = await supabaseClient.auth.signOut();
    if (error) console.log("Error: ", error.message);
  }

  return (
    <div
      className="header"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <button onClick={handleOAuthLogin} style={{ marginBottom: "10px" }}>
        Sign In With GitHub{" "}
      </button>

      <button onClick={handleOAuthLogout}>Sign Out</button>
    </div>
  );
};
