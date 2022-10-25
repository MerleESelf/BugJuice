import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthUserContext } from "../components/AuthUserContextProvider";

export const useAuth = () => {
  const authContext = useAuthUserContext();
  const router = useRouter();

  useEffect(() => {
    if (!authContext.user) {
      router.push("/login");
    }
  }, [router, authContext.user]);
};
