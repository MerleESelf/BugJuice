import { GithubSignIn } from "../components/auth/GithubSignIn";

const containerStyles = {
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
};

const signInContainerStyles = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
};

const LoginPage = () => {
  return (
    <div style={containerStyles}>
      Login
      <div style={signInContainerStyles}>
        <GithubSignIn />
      </div>
    </div>
  );
};

export default LoginPage;
