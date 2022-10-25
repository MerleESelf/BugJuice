import "../styles/globals.css";
import { AuthUserContextProvider } from "../components/AuthUserContextProvider";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.pathname === "/login") {
    return <Component {...pageProps} />;
  }
  return (
    <AuthUserContextProvider>
      <Component {...pageProps} />
    </AuthUserContextProvider>
  );
}

export default MyApp;