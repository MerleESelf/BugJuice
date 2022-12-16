import Head from "next/head";
import Link from "next/link";
import MyToDos from "./my-todos";
import NavBar from "../components/Navbar";
import { useAuthUserContext } from "../components/AuthUserContextProvider";
import { useAuth } from "../hooks/useAuth";
import Footer from "../components/Footer";

export default function Home() {
  useAuth();
  const { user, logOut, isNewUser } = useAuthUserContext();

  const logoStyle = { height: "80px", width: "80px" }
  return (
    <div className="flex flex-col justify-between ">
      <Head>
        <title>Bug Juice </title>
        <meta
          name="description"
          content="A task and bug tracking app generated by create next app"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ? (
        <>
          <NavBar logoStyle={logoStyle} logOut={logOut} />
          <MyToDos />
        </>
      ) : (
        <Link href="/login">
          <button className="logo">LOGIN</button>
        </Link>
      )}
      <Footer />
    </div >
  );
}