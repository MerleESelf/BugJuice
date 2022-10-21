import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthUserContext } from "../components/AuthUserContextProvider";

export const useAuth = () => {
  const authContext = useAuthUserContext();
  const router = useRouter();

  // console.log('auth context: user', authContext)
  useEffect(() => {
    if (!authContext.user) {
      // console.log('in use auth useEffect')
      router.push("/login");
    }
  }, [router, authContext.user]);
};
