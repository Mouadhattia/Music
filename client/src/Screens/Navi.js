import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";
import AddPoste from "../components/AddPoste";

const Navi = () => {
  const navigate = useNavigate();
  const current = useSelector((state) => state.userReducer.user);
  const authorization = localStorage.getItem("token");

  const [showUpload, setShowUpload] = useState(false);
  const clients = JSON.parse(localStorage.getItem("clients"));
  const [clientstoShow, setClients] = useState([]);

  const handleSearch = (e) => {
    navigate("/category/all?searchQuery=" + e.target.value.toLowerCase());
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <header id="header" className="page-header scroll-header fixed">
      <div className="navbar navbar-expand-lg">
        <a class="navbar-brand text-white">
          <img src={logo} width="40%" />
          <span class="hidden-folded d-inline l-s-n-1x">Fast Dream</span>
        </a>
        <div
          className="collapse navbar-collapse order-2 order-lg-1"
          id="navbarCollapse"
        >
          <ul className="navbar-nav" data-nav>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/")}>
                <span className="nav-text">Acceuil</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/artistes")}>
                <span className="nav-text">Artistes</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/category/all")}>
                <span className="nav-text">Catégories</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/about")}>
                <span className="nav-text">A propos</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" onClick={() => navigate("/contact")}>
                <span className="nav-text">Contact</span>
              </a>
            </li>
          </ul>
          <form
            className="input-group m-2 my-lg-0 "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <span className="input-group-prepend">
              <button type="button" className="btn no-shadow no-bg px-0">
                <Icon.Search />
              </button>
            </span>
            <input
              type="text"
              className="form-control no-border no-shadow no-bg typeahead"
              placeholder="Recherche..."
              onChange={handleSearch}
            />
          </form>
        </div>
        <ul className="nav navbar-menu order-1 order-lg-2">
          <li className="nav-item d-none d-sm-block">
            <a className="nav-link px-2" dataToggle="fullscreen">
              <Icon.Maximize />{" "}
            </a>
          </li>
          {authorization && (
            <li className="nav-item dropdown">
              <a
                className="nav-link px-2"
                onClick={() => setShowUpload(!showUpload)}
              >
                <Icon.Upload className="d-lg-none" />
                <span className="btn btn-rounded btn-sm gd-primary text-white d-none d-lg-block">
                  Upload
                </span>
              </a>
            </li>
          )}

          <li className="nav-item dropdown">
            <a
              dataToggle="dropdown"
              className="nav-link d-flex align-items-center py-0 px-lg-0 px-2 text-color"
            >
              <span
                className="avatar w-24 "
                onClick={() => navigate("/profile")}
              >
                <img
                  style={{ borderRadius: "50%", width: "24px", height: "24px" }}
                  src={
                    current?.url ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHfd3PPulVSp4ZbuBFNkePoUR_fLJQe474Ag&usqp=CAU"
                  }
                  alt="..."
                />
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right mt-3 animate fadeIn">
              <a className="dropdown-item">
                <span>Profile</span>
              </a>
              <a className="dropdown-item">
                <span>Tracks</span>
              </a>
              <a className="dropdown-item">
                <span>Albums</span>
              </a>
              <a className="dropdown-item">
                <span>Likes</span>
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item">Sign out</a>
            </div>
          </li>
          {authorization && (
            <li className="nav-item dropdown">
              <a className="nav-link px-2" onClick={() => handleLogout()}>
                <Icon.LogOut />
              </a>
            </li>
          )}

          <li className="nav-item d-lg-none">
            <a
              href="#"
              className="nav-link px-2"
              dataToggle="collapse"
              dataToggleClassName
              dataTarget="#navbarCollapse"
            >
              <i dataFeather="menu"></i>
            </a>
          </li>
        </ul>
      </div>
      {showUpload && <AddPoste setShowUpload={setShowUpload} />}
    </header>
  );
};

export default Navi;
