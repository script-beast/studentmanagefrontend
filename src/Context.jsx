import React from "react";

import Student_URL from "./Apis/Student.url";
import Staff_URL from "./Apis/Staff.url";

const AppContext = React.createContext({});

const Context = ({ children }) => {
  const userType = localStorage.getItem("usertype") || "";
  const tokenData = localStorage.getItem("token") || "";
  const [user, setUser] = React.useState(null);
  const [userJwt, setUserJwt] = React.useState(tokenData);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const logout = () => {
    setUser(null);
    setUserJwt(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usertype");
  };

  React.useEffect(() => {
    setIsLoading(true);

    if (tokenData && userType) {
      let url = "";
      if (userType === "student") url = Student_URL;
      else if (userType === "staff") url = Staff_URL;
      else {
        logout();
        setIsLoading(false);
        return;
      }
      fetch(url + "mydata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenData,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user && data.user._id) setUser(data.user);
          else logout();
        })
        .catch((err) => logout());
    }
    setIsLoading(false);
  }, [userJwt]);

  const login = (data, usertype) => {
    setIsLoading(true);
    setError(null);
    setUser(null);
    setUserJwt(null);

    let url = "";

    if (usertype === "student") url = Student_URL;
    else if (usertype === "staff") url = Staff_URL;
    else {
      setError("Invalid User Type");
      setIsLoading(false);
      return;
    }

    const sndta = {
      email: data.email,
      password: data.password,
    };

    fetch(url + "login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sndta),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setUserJwt(data.token);
          localStorage.setItem("token", data.token);
          localStorage.setItem("usertype", usertype);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
    setIsLoading(false);
  };

  return (
    <AppContext.Provider
      value={{ login, logout, user, userJwt, isLoading, error }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
export { AppContext };
