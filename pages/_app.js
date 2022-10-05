import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
import { supabaseClient } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const session = supabaseClient.auth.session();

  useEffect(() => {
    async function signOutUser() {
      await supabaseClient.auth.signOut();
      router.push("/login");
    }
    if (!session) {
      if (router.pathname !== "/login") {
        signOutUser();
      }
    } else {
      // use that session to get our sequelize User db info
      // make request to /api/users to load users
      // redirect to '/my-todos'
      router.push("/my-todos");
    }
  }, [router, session]);

  return <Component {...pageProps} />;
}

export default MyApp;
