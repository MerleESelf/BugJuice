import { supabaseClient } from "../../lib/supabase";

export const GithubSignIn = () => {
  async function handleOAuthLogin() {
    let { error } = await supabaseClient.auth.signIn({
      provider: "github",
    });
    if (error) console.log("Error: ", error.message);
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
