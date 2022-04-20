import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../js/action/user";
import { useDispatch } from "react-redux";
import logo from "../img/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="d-flex flex-column flex" style={{ marginTop: "5rem" }}>
      <div className="row no-gutters h-100">
        <div
          className="col-md-6 bg-dark bg-img"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80)",
          }}
        >
          <div className="p-3 p-md-5 d-flex flex-column h-100">
            <h4 className="mb-3 text-white">
              <a href="discover.html">
                <img src={logo} width="30%" />
              </a>
            </h4>
            <div className="d-flex flex align-items-center justify-content-center" />
            <div className="d-flex text-sm text-fade">
              <a href="index.html" className="text-white">
                About
              </a>
              <span className="flex" />
              <a href="#" className="text-white mx-1">
                Terms
              </a>
              <a href="#" className="text-white mx-1">
                Policy
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6" id="content-body">
          <div className="p-3 p-md-5">
            <h5>Bienvenue</h5>
            <p>
              <small className="text-muted">Connectez-vous !</small>
            </p>
            <form className="" role="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Entrer email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Mot de passe</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Mot de passe"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="my-3 text-right">
                  <a className="text-muted">mot de passe oublié ?</a>
                </div>
              </div>
              <div className="checkbox mb-3">
                <label className="ui-check">
                  <input type="checkbox" />
                  <i></i> rester connecté !
                </label>
              </div>
              <button
                className="btn btn-primary mb-4"
                onClick={() =>
                  dispatch(loginUser({ email, password }, navigate))
                }
              >
                Se connecter
              </button>
              <div>
                Vous avez pas un compte ?
                <a onClick={() => navigate("/signup")} className="text-primary">
                  S'enregistrer{" "}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
