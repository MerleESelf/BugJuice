import { useEffect } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    console.log("Were back in the app");
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
