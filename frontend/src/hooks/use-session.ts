const useSession = () => {
  const saveUser = (data: any) => {
    sessionStorage.setItem("user", JSON.stringify(data));
  };

  const getUser = () => {
    try {
      return JSON.parse(sessionStorage.getItem("user") || "");
    } catch {
      return null;
    }
  };

  const removeUser = () => {
    sessionStorage.removeItem("user");
  };

  const saveToken = (data: string) => {
    sessionStorage.setItem("token", data);
  };
  const getToken = () => {
    sessionStorage.getItem("token");
  };
  const removeToken = () => {
    sessionStorage.removeItem("token");
  };
  return { saveUser, getUser, removeUser, saveToken, getToken, removeToken };
};

export default useSession;
