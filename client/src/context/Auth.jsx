import { Flex, Spinner } from "@chakra-ui/react";
import { useContext, useState, createContext, useEffect } from "react";
import { fetchLogout, fetchMe } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [logedIn, setLogedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await fetchMe();

        setUser(me);
        setLogedIn(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const logIn = (response) => {
    setUser(response.user);
    setLogedIn(true);

    localStorage.setItem("access-token", response.accessToken);
    localStorage.setItem("refresh-token", response.refreshToken);
  };

  const logOut = async () => {
    setLogedIn(false)
    setUser(null)
    await fetchLogout()
    
    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  }

  const values = {
    user,
    logedIn,
    logIn,
    logOut
  };

  if (loading) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner />
      </Flex>
    );
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
