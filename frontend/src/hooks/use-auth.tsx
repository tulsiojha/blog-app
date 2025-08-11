import * as z from "zod";
import { loginSchema } from "@/lib/schemas";
import { queryClient } from "@/utils/query-client";
import { createContext, ReactNode, use, useEffect, useState } from "react";
import useSession from "./use-session";
import { useRouter } from "next/navigation";
import { toast } from "@/utils/commons";
import handleErrors from "@/utils/handleErrors";

type ILoginSchema = z.infer<typeof loginSchema>;

const AuthContext = createContext<{
  login?: (data: ILoginSchema) => Promise<void>;
  register?: (data: Record<string, any>) => Promise<void>;
  logout: () => void;
  user: any;
  loading: boolean;
}>({ user: null, loading: false, logout() {} });

export const AuthProvider = ({ children }: { children?: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { saveToken, saveUser, removeToken, removeUser, getUser } =
    useSession();
  const [user, setUser] = useState(getUser());

  useEffect(() => {
    setLoading(true);
    setUser(getUser());
    setLoading(false);
  }, []);

  const login = async (data: ILoginSchema) => {
    setLoading(true);
    try {
      const query = await queryClient.post("/auth/login", data);
      if (!query.data) {
        throw Error("Unable to login.");
      }
      const { user, accessToken } = query.data?.data;
      setUser(user);
      saveUser(user);
      saveToken(accessToken);
      router.push("/dashboard/posts");
    } catch (e) {
      toast(handleErrors(e), "error");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      await queryClient.post("/auth/register", data);
      router.push("/auth/login");
    } catch (e) {
      toast(handleErrors(e), "error");
      console.log(e);
    }
  };

  const logout = () => {
    setUser(null);
    removeToken();
    removeUser();
    router.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ login, register, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return use(AuthContext);
};

export default useAuth;
