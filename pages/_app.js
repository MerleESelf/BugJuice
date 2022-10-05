import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
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
