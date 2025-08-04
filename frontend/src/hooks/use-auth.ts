import * as z from "zod";
import { loginSchema, registerSchema } from "@/lib/schemas";
import { queryClient } from "@/utils/query-client";
import { createContext, useContext, useEffect, useState } from "react";
import useSession from "./use-session";
import { useRouter } from "next/navigation";

type ILoginSchema = z.infer<typeof loginSchema>;
type IRegisterSchema = z.infer<typeof registerSchema>;

const AuthContext = createContext({});

export const AuthProvider = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { saveToken, saveUser, removeToken, removeUser, getUser } =
    useSession();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  const login = async (data: ILoginSchema) => {
    setLoading(true);
    try {
      const query = await queryClient.post("/auth/login", data);
      if (!query.data) {
        throw Error("Unable to login.");
      }
      const { user, token } = query.data;
      setUser(user);
      saveUser(user);
      saveToken(token);
      router.push("/dashboard");
    } catch (e) {
      console.log(e);
    }
  };

  const register = async (data: IRegisterSchema) => {
    setLoading(true);
    try {
      await queryClient.post("/auth/register", data);
      router.push("/auth/login");
    } catch (e) {
      console.log(e);
    }
  };

  const logout = () => {
    removeToken();
    removeUser();
    setUser(null);
  };

  return { user, login, register, logout, loading };
};

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
