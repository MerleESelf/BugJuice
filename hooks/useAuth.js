import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabaseClient } from "../lib/supabase";

export const useAuth = () => {
  const router = useRouter();
  const user = supabaseClient.auth.user();
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);
};
