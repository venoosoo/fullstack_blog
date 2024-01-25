import { useContext, createContext, useState, useEffect, useHistory } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("site") || '');
  const navigate = useNavigate();

  
  const register = async (data) => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.data) {
        navigate("/login");
        return;
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    navigate("/login");
  };


  const isLoggedIn = () => {
    return Boolean(user); // Returns true if user is not null
  };

  return (
    <AuthContext.Provider value={{ token, user, logOut, register, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Exporting loginAction separately

export default AuthProvider;

export const useUser = () => {
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("site") || '');
  const navigate = useNavigate();

  const fetchData = async () => {
    const response = await fetch("/api/get_user_by_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
  
    const responseBody = await response.json();
    if (user.token != responseBody.token) {
      setUser(responseBody);
    }
  

  
  };


  useEffect(() => {
    // Check if the user is already set
    if (token != '') {
      fetchData();
    }
  console.log('user', user)
  }, [user]);

  const getUserData = () => {
    return user;
  };

  const setUserData = (data) => {
    console.log(data)
    setUser(data);
  };

  const userLoggedIn = () => {
    if (localStorage.getItem("site") != null) {
      return false
    } else {
      return true
    }
  };

  const logout = () => {
    setUser([]);
    localStorage.removeItem('site')
  };

  return {
    getUserData,
    setUserData,
    userLoggedIn,
    logout,
  };
};
