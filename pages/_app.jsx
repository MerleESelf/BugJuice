import { useEffect } from 'react'
import "../styles/globals.css";
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'
import { useState } from 'react'
import { useRouter } from "next/router";
import { useSupabaseClient } from '@supabase/auth-helpers-react'

function MyAppInner({ Component, pageProps }) {
  const supabaseClient = useSupabaseClient()
  const router = useRouter();

  useEffect(() => {
    async function getSession() {
      const { data: { session } } = await supabaseClient.auth.getSession()
      const currentPathname = router.pathname
      if (session === null && currentPathname !== '/login') {
        router.push('/login')
      }
    }
    getSession()
  })
  return <Component {...pageProps} />

}

function MyApp({ Component, pageProps }) {
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const props = {
    Component,
    pageProps
  }
  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <MyAppInner {...props} />
    </SessionContextProvider>
  );
}

export default MyApp