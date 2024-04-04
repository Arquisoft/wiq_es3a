import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));
  const [nombreUsuario, setUsuario_] = useState(localStorage.getItem("usuario"));

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  const setUsuario = (newNombre) => {
    setUsuario_(newNombre);
  };

  useEffect(() => {
    if (token) {
      //axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token',token);
    } else {
      //delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  useEffect(() => {
    if (nombreUsuario) {
      localStorage.setItem('usuario',nombreUsuario);
    } else {
      localStorage.removeItem('usuario')
    }
  }, [nombreUsuario]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      nombreUsuario,
      setUsuario
    }),
    [token,nombreUsuario]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;