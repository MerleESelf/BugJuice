import { supabase } from "../../lib/supabase";

export default function GithubSignIn() {
  async function handleOAuthLogin() {
    let { error } = await supabase.auth.signIn({
      provider: "github",
    });
    if (error) console.log("Error: ", error.message);
  }
  async function handleOAuthLogout() {
    let { error } = await supabase.auth.signOut();
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
}
