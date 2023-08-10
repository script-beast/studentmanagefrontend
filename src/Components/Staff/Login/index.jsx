import React from "react";
import "./Styles.css";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "../../../Context";
import staffURL from "../../../Apis/Staff.url";

const Index = () => {
  const navigate = useNavigate();
  const { user, login, isLoading, error } = React.useContext(AppContext);

  React.useEffect(() => {
    if (user) {
      navigate("/staff/dashboard");
    }
  }, [user]);

  React.useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data, "staff");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    fetch(`${staffURL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="staloginpage">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" defaultChecked />

        <div className="signup">
          <form onSubmit={handleRegister}>
            <label htmlFor="chk" aria-hidden="true">
              Sign up
            </label>
            <input
              type="text"
              placeholder="User name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button className="mybtn btn-red" type="submit">
              Sign up
            </button>
          </form>
        </div>

        <div className="login">
          <form onSubmit={handleLogin}>
            <label htmlFor="chk" aria-hidden="true">
              Login
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button type="submit" className="mybtn btn-red">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Index;
