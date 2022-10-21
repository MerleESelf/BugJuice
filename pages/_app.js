import "../styles/globals.css";
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";
// needed dnd context provider to get dnd function working lower down in the app
import { DndContext } from '@dnd-kit/core'
import { useAuth } from "../hooks/useAuth";

function MyApp({ Component, pageProps }) {

  return (
    <AuthUserContextProvider>
      <Component {...pageProps} />
    </AuthUserContextProvider>
  );
}

export default MyApp;
