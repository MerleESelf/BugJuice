import "../styles/globals.css";
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";

function MyApp({ Component, pageProps }) {
  return (
    <AuthUserContextProvider>
      <Component {...pageProps} />
    </AuthUserContextProvider>
  );
}

export default MyApp;
