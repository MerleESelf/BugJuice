import { GithubSignIn } from "../components/GithubSignIn";


const LoginPage = () => {
  const logoStyle = { height: "80px", width: "80px" }
  return (
    <div className="flex flex-col items-center content-center w-full h-full">
      <nav className="flex h-20 shadow-xl navbar place-content-between bg-base-100">
        <img className="flex-none" style={logoStyle} src="2.png" alt=""></img>
        <GithubSignIn />
      </nav>

      <img className="flex-grow" src="1 copy.png" alt=""></img>
      <h1 className="flex-grow">Another task managment app #veryoriginalcontent </h1>
    </div>
  );
};

export default LoginPage;
