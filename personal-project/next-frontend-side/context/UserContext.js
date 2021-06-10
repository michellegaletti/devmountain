import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const setStoredUser = (res) => {
    localStorage.setItem("userId", res.data.user_id);
    localStorage.setItem("username", res.data.email);
    setUser(res.data);
    router.push("/diary");
  };
  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    const email = localStorage.getItem("username");
    user_id
      ? setUser({ user_id, email })
      : router.pathname !== "/auth" && router.push("/auth");
  }, []);
  const handleRegister = (email, password) => {
    axios
      .post("http://localhost:3333/auth/register", { email, password })
      .then((res) => {
        setStoredUser(res);
      })
      .catch((err) => console.log(err));
  };
  const handleLogin = (email, password) => {
    axios
      .post("http://localhost:3333/auth/login", { email, password })
      .then((res) => {
        setStoredUser(res);
      })
      .catch((err) => console.log(err));
  };
  const handleLogout = () => {
    axios
      .get("http://localhost:3333/auth/logout")
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        setUser(null);
        router.push("/auth");
      })
      .catch((err) => console.log(err));
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleRegister,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
