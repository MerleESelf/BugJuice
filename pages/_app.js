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
      <nav className="navbar bg-base-100">
        <a className="btn btn-ghost normal-case text-xl">Bug Juice</a> </nav>
      <Component {...pageProps} />
    </AuthUserContextProvider>
  );
}


export default MyApp