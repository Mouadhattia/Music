import React, { useEffect, useState } from "react";
import M from "materialize-css";
import { useNavigate } from "react-router-dom";
import * as Icon from "react-feather";

const AddPoste = ({ setShowUpload }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [music, setMusic] = useState("");
  const [url, setUrl] = useState(undefined);
  const [img, setImg] = useState(undefined);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    let URI = process.env.REACT_APP_API;
    if (url && img) {
      fetch(URI + "/createpost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title,
          body,
          url,
          img,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
            M.toast({
              html: data.error,
              classes: "#e53935 red darken-1",
            });
          } else {
            M.toast({ html: "posted", classes: "#43a047 green darken-1" });
            navigate("/");
            setShowUpload(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      M.toast({
        html: "Veuillez attendre",
        classes: "#e53935 red darken-1",
      });
    }
  }, [url]);
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
        setImg(data.url);
        console.log(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const postDetails = () => {
    setloading(true);
    uploadPic();
    const data = new FormData();
    data.append("file", music);
    data.append("upload_preset", "ywtxhaze");
    data.append("resource_type", "raw");
    data.append("cloud_name", "dh8bgpvun");
    fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/video/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setloading(false);
          M.toast({
            html: data.error.message,
            classes: "#e53935 red darken-1",
          });
        } else {
          console.log(data.url);
          setloading(false);
          setUrl(data.url);
        }
      });
  };

  return (
    <div
      className="card input-filed mt-5"
      style={{
        margin: "auto",
        maxWidth: "500px",
        padding: "20px",
       
      }}
    >
      {loading ? <Icon.Loader size={64} /> : <span style={{margin:'auto',fontSize:"20px"}}>Upload Music</span>}
      <label style={{fontSize:"18px"}} > Image</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <label style={{fontSize:"18px"}} > Track</label>
      <input type="file" onChange={(e) => setMusic(e.target.files[0])} />
      <input
      style={{color:"black", padding:"5px", hieght:"50px" ,margin:"5px 0 5px 0" ,border:"none",borderRadius:"5px" ,fontSize:"18px"}}
        type="text"
        placeholder="Titre"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
 style={{color:"black", padding:"5px", hieght:"50px" ,margin:"5px 0 5px 0" ,border:"none",borderRadius:"5px" ,fontSize:"18px"}}
        type="text"
        placeholder="Description"
        onChange={(e) => setBody(e.target.value)}
      />

      <button
      style={{marginTop:"5px"}}
        className="btn waves-effect blue darken-1"
        onClick={() => postDetails()}
      >
        Valider
      </button>
    </div>
  );
};

export default AddPoste;
