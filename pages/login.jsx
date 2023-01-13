import { GithubSignIn } from "../components/GithubSignIn";
import Image from "next/image";
const LoginPage = () => {
  return (
    <div className="min-h-screen hero bg-base-200">
      <div className="flex-col text-center shadow-2xl rounded-3xl hero-content lg:flex-row bg-base-300">
        <Image src="/Bug Juice.png" alt="" height={300} width={300} className="max-w-lg rounded-lg " />
        <div className="flex flex-col items-center ">
          <h1 className="text-5xl font-bold">Task tracking built simple </h1>
          <p className="py-6">Made by developers, for developers.</p>
          <GithubSignIn />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
