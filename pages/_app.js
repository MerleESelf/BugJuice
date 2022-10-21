import "../styles/globals.css";
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";
// needed dnd context provider to get dnd function working lower down in the app
import { DndContext } from '@dnd-kit/core'
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === '/login') {
    return (
      <Component {...pageProps} />
    );
  }
  return (
    <AuthUserContextProvider>
      <Component {...pageProps} />
    </AuthUserContextProvider>
  )
}

export default MyApp;
