import { useEffect } from "react";
import "../styles/globals.css";
import { supabaseClient } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const session = supabaseClient.auth.session();
    if (!session) {
      // redirect to /logIn
      console.log("No Session");
    } else {
      // redirect to '/my-todos'
      // use that session to get our sequelize User db info
      // make request to /api/users to load users
    }
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
