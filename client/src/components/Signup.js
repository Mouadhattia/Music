import React, { useEffect } from "react";
import { Link, useN, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../js/action/user";
import { useDispatch } from "react-redux";
import b7 from "../img/b7.jpg";
const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setrole] = useState("user");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState(undefined);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      dispatch(registerUser({ name, email, password, url, role }, navigate));
    }
  }, [url]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "project");
    data.append("cloud_name", "djrx5huus");
    fetch("https://api.cloudinary.com/v1_1/djrx5huus/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postData = ({ name, email, password, url }, navigate) => {
    if (image) {
      uploadPic();
    } else {
      dispatch(registerUser({ name, email, password, url }, navigate));
    }
  };
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
            <h4 className="mb-3 text-white">Fast Dream</h4>
            <div className="text-fade">Music Web Application</div>
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
            <h5>Bienvenue sur Fast Dream</h5>
            <p>
              <small className="text-muted">
                S'enregistrer avec les réseaux sociaux
              </small>
            </p>
            <div className="">
              <form name="form" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <a
                    href="#"
                    className="btn btn-icon btn-rounded indigo text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 264 512"
                    >
                      <path
                        fill="currentColor"
                        d="M76.7 512V283H0v-91h76.7v-71.7C76.7 42.4 124.3 0 193.8 0c33.3 0 61.9 2.5 70.2 3.6V85h-48.2c-37.8 0-45.1 18-45.1 44.3V192H256l-11.7 91h-73.6v229"
                        className=""
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-rounded cyan text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                        className=""
                      ></path>
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="btn btn-icon btn-rounded red text-white"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 640 512"
                    >
                      <path
                        fill="currentColor"
                        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                        className=""
                      ></path>
                    </svg>
                  </a>
                </div>
                <div className="my-3 text-muted text-sm text-muted">OU</div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className="form-group">
                    <select
                      name="role"
                      defaultValue="user"
                      className="form-control"
                      id="role"
                      required
                      onChange={(e) => setrole(e.target.value)}
                    >
                      <option value="user">utilisateur</option>
                      <option value="artist">Artist</option>
                      <option value="dj">Dj</option>
                      <option value="manager">Manager</option>
                    </select>
                  </div>
                  {/* <div className="file-field input-field ">
            <div className="btn blue darken-1">
              <span>Upload File</span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div> */}
                </div>
                <div className="mb-3 text-sm">
                  <span className="text-muted">
                    En cliquant sur S'inscrire, j'accepte{" "}
                  </span>
                  <a href="#">Conditions de service</a>
                </div>
                <button
                  className="btn btn-primary mb-4"
                  onClick={() =>
                    postData({ name, email, password, url }, navigate)
                  }
                >
                  S'inscrire
                </button>
                <div>
                  Vous avez deja un compte ?{" "}
                  <a
                    onClick={() => navigate("/login")}
                    className="text-primary _600"
                  >
                    Se connecter{" "}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
