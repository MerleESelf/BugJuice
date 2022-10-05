import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/globals.css";
import { supabaseClient } from "../lib/supabase";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    setSession(supabaseClient.auth.session());
    supabaseClient.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_IN") {
        const user = supabaseClient.auth.user();
        setUser(user);
        router.push("/my-todos");
      }
      setSession(session);
    });
  }, [router]);

  return <Component {...pageProps} />;
}

export default MyApp;
