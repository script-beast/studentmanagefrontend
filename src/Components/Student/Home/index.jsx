import React from "react";
import "./Styles.css";

import { useNavigate, Link } from "react-router-dom";

import { AppContext } from "../../../Context";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading, logout } = React.useContext(AppContext);

  React.useEffect(() => {
    const userType = localStorage.getItem("usertype") || "";
    if (userType !== "student") {
      navigate("/");
    }
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user]);

  const downloadFile = () => {
    const blob = new Blob([user.userPdf.data.data], {
      type: "application/pdf",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${user.name}`;
    link.click();
  };

  return (
    <div className="stuhomepage">
      <div className="header">
        <h1 className="mint">Student Dashboard</h1>
        <div className="btnarea">
          <Link to="/" className="mybtn btn-blue">
            Back
          </Link>
          <button className="mybtn btn-red" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <div className="cards">
        <article className="plan card">
          <div className="inner">
            <span className="pricing">
              <span>Student</span>
            </span>
            <h2 className="title">{user?.name}</h2>

            <ul className="features">
              <li>
                <span>
                  <strong>Email</strong> {user?.email}
                </span>
              </li>
              <li>
                <span>
                  <strong>Phone</strong> {user?.phone}
                </span>
              </li>
            </ul>
            <button onClick={downloadFile} className="button mybtn btn-green">
              <span>Download CV</span>
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Index;
