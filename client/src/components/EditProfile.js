import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile } from "../js/action/user";

const Edit = () => {
  const [toChange, setToChange] = useState({ name: "", email: "", url: "" });
  const [image, setImage] = useState("");
  const [imageUrl, setimageUrl] = useState(undefined);

  const dispatch = useDispatch();
  const current = useSelector((state) => state.userReducer.user);
  useEffect(() => {
    setToChange({ name: current.name, email: current.email, url: current.url });
  }, [current]);

  const handleChange = (e) => {
    e.preventDefault();
    setToChange({ ...toChange, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    uploadPic();
  }, [image]);

  const uploadPic = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ywtxhaze");
    data.append("cloud_name", "dh8bgpvun");
    fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setimageUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    dispatch(editProfile(current._id, { ...toChange, url: imageUrl }));
  };

  return (
    <div>
      <div
        className="card input-filed"
        style={{
          margin: "300px",
          maxWidth: "1000px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <img src={imageUrl || toChange.url} width="300px" />
        <div className="file-field input-field ">
          <div className="btn blue darken-1">
            <span>Upload Image</span>
            <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          </div>
          <div className="file-path-wrapper">
            <input className="file-path validate" type="text" />
          </div>
        </div>
        <input
          type="text"
          placeholder="name"
          value={toChange.name}
          name="name"
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="email"
          value={toChange.email}
          name="email"
          onChange={handleChange}
        />
        <Link to="/profile">
          <button
            className="btn waves-effect blue darken-1"
            onClick={() => handleEdit()}
          >
            Save
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Edit;
