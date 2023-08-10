import React from "react";
import "./Styles.css";

import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="homepage">
      <div className="header">
        <h1 className="grays">Student Management System</h1>
      </div>

      <div className="container">
        <div className="card">
          <div className="box">
            <div className="content">
              <h2>Student</h2>
              <h3>Student Section</h3>
              <Link className="mybtn btn-blue" to="/student/login">
                Student Login
              </Link>
              <Link className="mybtn btn-blue" to="/student/register">
                Student Register
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="box">
            <div className="content">
              <h2>Staff</h2>
              <h3>Staff Section</h3>
              <Link className="mybtn btn-red" to="/staff/login">
                Staff Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
