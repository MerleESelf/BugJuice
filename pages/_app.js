import "../styles/globals.css";
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";
// needed dnd context provider to get dnd function working lower down in the app
import { DndContext } from '@dnd-kit/core'

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserContextProvider>
      <DndContext>
        <Component {...pageProps} />
      </DndContext>
    </AuthUserContextProvider>
  );
}

export default MyApp;
