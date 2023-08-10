import React from "react";
import "./Styles.css";

import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { AppContext } from "../../../Context";

const Index = () => {
  const navigate = useNavigate();
  const { user, login, isLoading, error } = React.useContext(AppContext);

  React.useEffect(() => {
    if (user) {
      navigate("/student/dashboard");
    }
  }, [user]);

  React.useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    login(data, "student");
  };

  return (
    <div className="stuloginpage">
      <section className="container">
        <div className="login-container">
          <div className="circle circle-one"></div>
          <div className="form-container">
            <h1 className="opacity">LOGIN</h1>
            <form>
              <input
                type="text"
                placeholder="EMAIL"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="PASSWORD"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <button className="opacity" type="submit" onClick={handleLogin}>
                SUBMIT
              </button>
            </form>
            <div className="register-forget opacity">
              <Link to="/student/register">REGISTER</Link>
            </div>
          </div>
          <div className="circle circle-two"></div>
        </div>
        <div className="theme-btn-container"></div>
      </section>
    </div>
  );
};

export default Index;
