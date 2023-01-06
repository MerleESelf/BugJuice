import "../styles/globals.css";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  console.log('1: ', pageProps)
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  console.log(supabaseClient)
  const router = useRouter();
  if (router.pathname === "/login") {
    return <Component {...pageProps} />;
  }
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <AuthUserContextProvider>
        <Component {...pageProps} />
      </AuthUserContextProvider>
    </SessionContextProvider>
  );
}

export default MyApp