import React from "react";
import "./Styles.css";

import { useNavigate, Link } from "react-router-dom";

import staffURL from "../../../Apis/Staff.url";
import { AppContext } from "../../../Context";

const Index = () => {
  const navigate = useNavigate();
  const { user, userJwt, isLoading, logout } = React.useContext(AppContext);
  const [list, setList] = React.useState([]);

  React.useEffect(() => {
    const userType = localStorage.getItem("usertype") || "";
    if (userType !== "staff") {
      navigate("/");
    }
    if (!user && !isLoading) {
      navigate("/");
    }
  }, [user, isLoading]);

  React.useEffect(() => {
    fetch(`${staffURL}allstudent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userJwt,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setList(data.students);
      })
      .catch((err) => console.log(err));
  }, []);

  const downloadFile = (id) => {
    const user = list.find((item) => item._id === id);
    const blob = new Blob([user.userPdf.data.data], {
      type: "application/pdf",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `${user.name}`;
    link.click();
  };

  const renderlist = () => {
    return list.map((item, idx) => (
      <li className="table-row" key={item._id}>
        <div className="col col-1" data-label="Id">
          {idx + 1}
        </div>
        <div className="col col-3" data-label="Name">
          {item?.name}
        </div>
        <div className="col col-2" data-label="Email">
          {item?.email}
        </div>
        <div className="col col-3" data-label="Phone">
          {item?.phone}
        </div>
        <div className="col col-4" data-label="CV">
          <button className="mybtn btn-green">
            <span>Download CV</span>
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="staffhomepage">
      <div className="header">
        <h1 className="purples">Staff Dashboard</h1>
        <div className="btnarea">
          <Link to="/" className="mybtn btn-blue">
            Back
          </Link>
          <button className="mybtn btn-red" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
      <div className="container">
        <ul className="responsive-table">
          <li className="table-header">
            <div className="col col-1">Id</div>
            <div className="col col-3">Name</div>
            <div className="col col-2">Email</div>
            <div className="col col-3">Phone</div>
            <div className="col col-4">Download CV</div>
          </li>
          {renderlist()}
        </ul>
      </div>
    </div>
  );
};

export default Index;
