import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuthUserContext } from "../components/AuthUserContextProvider";

export const useAuth = () => {
  const { user } = useAuthUserContext();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
};
