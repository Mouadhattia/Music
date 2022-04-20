import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { editProfile, getcurrent } from "../js/action/user";
import { getUserPosts } from "../js/action/post";
import ReactAudioPlayer from "react-audio-player";
import Player from "../components/Player";
import ImageGallery from "react-image-gallery";
import { Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import ReactPlayer from "react-player";

let URI = process.env.REACT_APP_API;

function makeId(length = 5) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const Profile = () => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };

  const navigate = useNavigate();
  const myPosts = useSelector((state) => state.postReducer.posts);
  const loadPosts = useSelector((state) => state.postReducer.loadPosts);

  const [play, setplay] = useState(false);

  const [selectedAudio, setSelectedAudio] = useState(
    "http://example.com/audio.mp3"
  );

  const [socialVisible, setSocialVisible] = useState(false);
  const [socialConfirmLoading, setSocialConfirmLoading] = useState(false);
  const [socialmodalText, setSocialModalText] = useState(
    "Content of the modal"
  );
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");

  const [youtubeUrls, setYoutubeUrls] = useState([]);
  const current = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getUserPosts());
    dispatch(getcurrent());
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    let URI = process.env.REACT_APP_API;
    console.log(URI, "URI");
    axios
      .get(URI + "/myImages", options)
      .then((res) => {
        setmyImages([...res.data.myImages]);
        let imgs = res.data.myImages.map((e) => ({
          uid: e._id,
          name: "xxx.png",
          status: "done",
          url: e.url,
        }));
        let Ids = res.data.myImages.map((e) => e._id);
        setFileList(imgs);
        setFileIdsList(Ids);
      })
      .catch((err) => console.log(err));

    axios
      .get(URI + "/video/get?id=" + current?._id, options)
      .then((res) => {
        setYoutubeUrls(
          res.data.map((e) => ({
            value: e.url,
            id: e._id,
          }))
        );
      })
      .catch((error) => {
        alert(error.message);
        console.log(error);
      });
  }, []);
  useEffect(async () => {
    alert(JSON.stringify({ current }));
    if (!current) {
      dispatch(getcurrent());
    }
    if (youtubeUrls.length === 0 && current) {
      alert("getting videos");
      const options = {
        headers: {
          authorization: localStorage.getItem("token"),
        },
      };
      try {
        let result = await axios.get(
          URI + "/video/get?id=" + current._id,
          options
        );

        setYoutubeUrls(
          result.data.map((e) => ({
            value: e.url,
            id: e._id,
          }))
        );
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    }
  }, [dummy, current]);
  const showModalSocial = () => {
    setSocialVisible(true);
  };

  const handleOkSocial = () => {
    setSocialModalText("The modal will be closed after two seconds");
    setSocialConfirmLoading(true);
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    axios.put(
      "http://85.215.228.216:5002/setSocialMedia",
      {
        facebook: facebook,
        instagram: instagram,
        twitter: twitter,
      },
      options
    );
    setTimeout(() => {
      setSocialVisible(false);
      setSocialConfirmLoading(false);
    }, 2000);
  };

  const handleCancelSocial = () => {
    console.log("Clicked cancel button");
    setSocialVisible(false);
  };
  //** */
  const [myImages, setmyImages] = useState([]);
  const images = [
    {
      original:
        "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1516223725307-6f76b9ec8742?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1485120750507-a3bf477acd63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1485120750507-a3bf477acd63?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
    {
      original:
        "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      thumbnail:
        "https://images.unsplash.com/photo-1525926477800-7a3b10316ac6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    },
  ];

  const handlePlay = (src) => {
    setplay(true);
    setSelectedAudio(src);
  };

  const [toChange, setToChange] = useState({
    name: "",
    email: "",
    url: "",
    phone: "",
    description: "",
  });
  const [image, setImage] = useState("");
  const [imageUrl, setimageUrl] = useState(undefined);

  const dispatch = useDispatch();

  useEffect(() => {
    setToChange({
      name: current?.name,
      email: current?.email,
      url: current?.url,
      phone: current?.phone,
      description: current?.description,
      facebook: current?.facebook,
      instagram: current?.instagram,
      twitter: current?.twitter,
    });
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
        console.log(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = () => {
    dispatch(editProfile(current._id, { ...toChange, url: imageUrl }));
    navigate("/profile");
  };

  const saveUserVideos = () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    Promise.all(
      youtubeUrls.map((url) => {
        axios
          .post(
            "http://85.215.228.216:5002/video/",
            {
              url,
            },
            options
          )
          .then((e) => {});
      })
    )
      .then((res) => {
        window.location.reload();
      })
      .catch((e) => {
        alert(e.error);
      });
  };
  //////////////////////////////:GALERIE////////////////////////
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [dummy, setDummy] = useState("");
  const [fileIdsList, setFileIdsList] = useState([]);
  console.log(fileList);
  const uploadimg = (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ywtxhaze");
    data.append("cloud_name", "dh8bgpvun");
    return fetch("https://api.cloudinary.com/v1_1/dh8bgpvun/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((cloudinaryResponse) => {
        return axios.post(
          "http://85.215.228.216:5002/uploadImage",
          {
            url: cloudinaryResponse.url,
          },
          options
        );
      })
      .then((serverResponse) => {
        return {
          file,
          ...serverResponse.data,
        };
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
    //   uploadimg(file);
  };

  const handleChangeIMG = ({ fileList }) => {
    setFileList(fileList);
  };

  const onRemove = (file) => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("token"),
      },
    };
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);

    const newFileIdsList = fileIdsList.slice();
    alert("removed this id : " + newFileIdsList[index]);
    axios.post(
      `http://85.215.228.216:5002/image/deleteImages/`,
      { imageId: newFileIdsList[index] },
      options
    );

    newFileIdsList.splice(index, 1);
    setFileIdsList(newFileIdsList);
    return {
      fileList: newFileList,
    };
  };

  const beforeUpload = (file) => {
    let newfileList = [...fileList, file];
    setFileList(newfileList);
    uploadimg(file).then((uploadResult) => {
      setFileIdsList([...fileIdsList, uploadResult.imageId]);
    });
    return false;
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div id="main" className="layout-row flex">
      {/* ############ Content START*/}
      <div id="content" className="flex">
        {/* ############ Main START*/}
        <div>
          <div className="page-content page-container" id="page-content">
            <div className="padding sr">
              <div
                className="page-hero"
                data-id={2}
                data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/07/2c/59/072c59fe-549d-bd0e-f93d-3e4a1f673af5/mzaf_4035597378145374075.plus.aac.p.m4a"
              >
                <div className="media bg-media">
                  <div
                    className="media-content"
                    style={{ backgroundImage: "url(../assets/img/b10.jpg)" }}
                  />
                </div>

                <div className="pos-rlt">
                  <img
                    src={imageUrl || toChange.url}
                    width="150"
                    height="150"
                    style={{ borderRadius: "50%" }}
                  />
                  {/* <input
                    type="file"
                    placeholder="modifier"
                    onChange={(e) => setImage(e.target.files[0])}
                  /> */}
                  <div class="file-input">
                    <input
                      type="file"
                      name="file-input"
                      id="file-input"
                      class="file-input__input"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label class="file-input__label" for="file-input">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="upload"
                        class="svg-inline--fa fa-upload fa-w-16"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                        ></path>
                      </svg>
                      <span>Modifier</span>
                    </label>
                  </div>
                  <h1 className="display-3 font-weight-bold text-white">
                    {toChange.name}
                  </h1>
                  <span className="hide title">Shallow</span>
                  <span className="hide subtitle">
                    Lady Gaga &amp; Bradley Cooper
                  </span>
                  <div className="py-4 toolbar align-items-center">
                    <button
                      className="btn btn-icon btn-play btn-rounded gd-primary"
                      data-toggle-class=""
                    />
                    <span className="text-muted">10 tracks, 5 playlist</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Social: </span>
                    <a onClick={showModalSocial}>
                      <Icon.Facebook />
                    </a>
                    <a onClick={showModalSocial}>
                      <Icon.Instagram style={{ marginLeft: "0.5rem" }} />
                    </a>
                    <a onClick={showModalSocial}>
                      <Icon.Twitter style={{ marginLeft: "0.5rem" }} />
                    </a>
                    <Modal
                      title="Title"
                      visible={socialVisible}
                      onOk={handleOkSocial}
                      confirmLoading={socialConfirmLoading}
                      onCancel={handleCancelSocial}
                    >
                      <div>
                        <div>
                          <p>Facebook</p>
                          <input
                            type="text"
                            placeholder="Facebook"
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Instagrame</p>
                          <input
                            type="text"
                            placeholder="Instagrame"
                            onChange={(e) => setInstagram(e.target.value)}
                          />
                        </div>
                        <div>
                          <p>Twitter</p>
                          <input
                            type="text"
                            placeholder="Twitter"
                            onChange={(e) => setTwitter(e.target.value)}
                          />
                        </div>
                      </div>
                    </Modal>
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Name</span>
                    <input
                      className="my_in"
                      type="text"
                      placeholder="name"
                      value={toChange.name}
                      name="name"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-2">
                    <span className="text-muted">Email: </span>
                    <input
                      className="my_in"
                      type="text"
                      placeholder="email"
                      value={toChange.email}
                      name="email"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Telephone: </span>
                    <input
                      className="my_in"
                      type="text"
                      placeholder="Telephone"
                      value={toChange.phone}
                      name="phone"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-muted">Description: </span>
                    <input
                      className="my_in"
                      type="text"
                      placeholder="description"
                      value={toChange.description}
                      name="description"
                      onChange={handleChange}
                    />
                  </div>
                  <button
                    className="btn waves-effect blue darken-1"
                    onClick={() => handleEdit()}
                  >
                    Enregistrer
                  </button>
                  {play && <Player src={selectedAudio} />}
                </div>
              </div>
              <div className="d-md-flex pos-rlt">
                <div className="flex">
                  <div className="d-flex">
                    <ul className="nav nav-sm text-sm nav-pills nav-rounded py-4">
                      <li className="nav-item" onFocus={() => setDummy("1")}>
                        <a
                          className="nav-link active"
                          href="#overview"
                          data-toggle="tab"
                        >
                          Presentation
                        </a>
                      </li>
                      <li className="nav-item" onFocus={() => setDummy("2")}>
                        <a
                          className="nav-link"
                          href="#tracks"
                          data-toggle="tab"
                        >
                          Galerie
                        </a>
                      </li>
                      <li className="nav-item" onFocus={() => setDummy("3")}>
                        <a
                          className="nav-link"
                          href="#albums"
                          data-toggle="tab"
                        >
                          Albums
                        </a>
                      </li>

                      <li className="nav-item" onFocus={() => setDummy("4")}>
                        <a
                          className="nav-link"
                          href="#youtube"
                          data-toggle="tab"
                        >
                          Youtube
                        </a>
                      </li>
                      {/* <li className="nav-item">
                        <a
                          className="nav-link"
                          href="#playlist"
                          data-toggle="tab"
                        >
                          Playlist
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="overview">
                      <div className="heading pt-5 pb-3 d-flex">
                        <div>
                          <div className="text-muted sr-item">Popular</div>
                          <h5 className="text-highlight sr-item">Tracks</h5>
                        </div>
                        <span className="flex" />
                      </div>
                      <div className="row list-row list-index">
                        {loadPosts ? (
                          <div className="progress">
                            <div className="indeterminate"></div>
                          </div>
                        ) : (
                          myPosts.map((el) => (
                            <div
                              className="col-12"
                              data-id={434202110}
                              data-category="Hip-Hop"
                              data-tag="USA"
                              data-source={el.url}
                            >
                              <div className="list-item r">
                                <div
                                  className="media"
                                  onClick={() => handlePlay(el.url)}
                                >
                                  <a
                                    href="item.detail.html#434202110"
                                    className="ajax media-content"
                                    style={{
                                      backgroundImage:
                                        "url(../assets/img/c13.jpg)",
                                    }}
                                  ></a>
                                  <div className="media-action media-action-overlay">
                                    <button
                                      className="btn btn-icon no-bg no-shadow hide-row"
                                      data-toggle-class=""
                                    >
                                      <i
                                        data-feather="heart"
                                        className="active-fill"
                                      />
                                    </button>
                                    <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                    <button
                                      className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                      data-toggle="dropdown"
                                    >
                                      <Icon.MoreHorizontal />{" "}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" />
                                  </div>
                                </div>
                                <div className="list-content text-center">
                                  <div className="list-body">
                                    <a
                                      href="item.detail.html#434202110"
                                      className="list-title title ajax h-1x"
                                    >
                                      {el.title}
                                    </a>
                                    <a
                                      href="artist.detail.html#434202110"
                                      className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                    >
                                      {el.body}
                                    </a>
                                  </div>
                                </div>
                                <div className="list-action show-row">
                                  <div className="d-flex align-items-center">
                                    <div className="px-3 text-sm text-muted d-none d-md-block">
                                      03:24
                                    </div>
                                    <button
                                      className="btn btn-icon no-bg no-shadow"
                                      data-toggle-class=""
                                    >
                                      <i
                                        data-feather="heart"
                                        className="active-primary"
                                      />
                                    </button>
                                    <button
                                      className="btn btn-icon no-bg no-shadow btn-more"
                                      data-toggle="dropdown"
                                    >
                                      <Icon.MoreHorizontal />{" "}
                                    </button>
                                    <div className="dropdown-menu dropdown-menu-right" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                    <div className="tab-pane fade" id="tracks">
                      <div className="container">
                        <div
                          className="col-12"
                          data-id={438387803}
                          data-category="Dance"
                          data-tag="Other"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/23/17/88/23178814-ef4f-1b4d-294d-89cd434941a2/mzaf_8868960744652419987.plus.aac.p.m4a"
                        >
                          {/* <ImageGallery items={images} /> */}
                          <>
                            <h3>Galerie</h3>
                            <Upload
                              listType="picture-card"
                              fileList={fileList}
                              onPreview={handlePreview}
                              onChange={handleChangeIMG}
                              onRemove={onRemove}
                              beforeUpload={beforeUpload}
                            >
                              {fileList.length >= 8 ? null : uploadButton}
                            </Upload>
                            <Modal
                              visible={previewVisible}
                              title={previewTitle}
                              footer={null}
                              onCancel={handleCancel}
                            >
                              <img
                                alt="example"
                                style={{ width: "100%" }}
                                src={previewImage}
                              />
                            </Modal>
                          </>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="albums">
                      <div className="row list mb-4">
                        <div
                          className="col-4 col-sm-3"
                          data-id={402107013}
                          data-category="Dance"
                          data-tag="All"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/03/e5/25/03e52558-25b4-e41a-8b0a-c5ee14cf51de/mzaf_7464768196891763269.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#402107013"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c15.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#402107013"
                                  className="list-title title ajax h-1x"
                                >
                                  Later Bitches
                                </a>
                                <a
                                  href="artist.detail.html#402107013"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  The Prince Karma
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={443321905}
                          data-category="Rap"
                          data-tag="USA"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/aa/41/38/aa413803-5b2d-a5de-381f-351d5ebcc3cb/mzaf_2919139327828656331.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#443321905"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c16.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#443321905"
                                  className="list-title title ajax h-1x"
                                >
                                  ZEZE
                                </a>
                                <a
                                  href="artist.detail.html#443321905"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  Kodak Black Feat. Offset &amp; Travis Scott
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={434628736}
                          data-category="Pop"
                          data-tag="USA"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/1d/44/74/1d447462-1811-5cfd-90f7-13edea1193d9/mzaf_5901924055590298818.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#434628736"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c9.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#434628736"
                                  className="list-title title ajax h-1x"
                                >
                                  Thunderclouds
                                </a>
                                <a
                                  href="artist.detail.html#434628736"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  LSD Feat. Sia &amp; Diplo &amp; Labrinth
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={428550515}
                          data-category="RAP"
                          data-tag="Australia"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview115/v4/4c/58/f4/4c58f4f0-ec84-c5e3-15ed-39beb0933e38/mzaf_3604425775820894823.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#428550515"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c3.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#428550515"
                                  className="list-title title ajax h-1x"
                                >
                                  Be Alright
                                </a>
                                <a
                                  href="artist.detail.html#428550515"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  Dean Lewis
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={439309038}
                          data-category="R&B"
                          data-tag="USA"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/26/d1/f1/26d1f10f-723e-66c9-4355-9575f40bc85b/mzaf_5907372873406991062.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#439309038"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c34.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#439309038"
                                  className="list-title title ajax h-1x"
                                >
                                  Better
                                </a>
                                <a
                                  href="artist.detail.html#439309038"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  Khalid
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={374705210}
                          data-category="Rap"
                          data-tag="USA"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/dc/c4/0b/dcc40b4d-283b-e9a2-6209-ca988087cc0e/mzaf_8137717147287964110.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#374705210"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c22.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#374705210"
                                  className="list-title title ajax h-1x"
                                >
                                  Mo Bamba
                                </a>
                                <a
                                  href="artist.detail.html#374705210"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  Sheck Wes
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={442009655}
                          data-category="Pop"
                          data-tag="England"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/07/7e/24/077e2447-0d02-1c40-729b-a4a87e7ecd51/mzaf_3261492558713394996.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#442009655"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c19.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#442009655"
                                  className="list-title title ajax h-1x"
                                >
                                  Woman Like Me
                                </a>
                                <a
                                  href="artist.detail.html#442009655"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  Little Mix Feat. Nicki Minaj
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-4 col-sm-3"
                          data-id={438654695}
                          data-category="Dance"
                          data-tag="France"
                          data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c1/60/68/c1606821-459e-0575-ad3b-6b291f2dbf66/mzaf_3521330005736623852.plus.aac.p.m4a"
                        >
                          <div className="list-item list-hover r mb-4">
                            <div className="media">
                              <a
                                href="item.detail.html#438654695"
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(../assets/img/c23.jpg)",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row"
                                  data-toggle-class=""
                                >
                                  <i
                                    data-feather="heart"
                                    className="active-fill"
                                  />
                                </button>
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />
                                <button
                                  className="btn btn-icon no-bg no-shadow hide-row btn-more"
                                  data-toggle="dropdown"
                                >
                                  <Icon.MoreHorizontal />{" "}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a
                                  href="item.detail.html#438654695"
                                  className="list-title title ajax h-1x"
                                >
                                  Say My Name
                                </a>
                                <a
                                  href="artist.detail.html#438654695"
                                  className="list-subtitle d-block text-muted h-1x subtitle ajax"
                                >
                                  David Guetta &amp; Bebe Rexha &amp; J Balvin
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="tab-pane fade" id="youtube">
                      <div className="container">
                        <div
                          style={{
                            color: "black",
                          }}
                        >
                          <>
                            {youtubeUrls.map((v, k) => (
                              <div key={k}>
                                {
                                  <div key={youtubeUrls[k].id}>
                                    <input
                                      value={youtubeUrls[k]?.value}
                                      style={{
                                        borderRadius: 20,
                                        paddingLeft: 15,
                                      }}
                                      onChange={(e) => {
                                        setYoutubeUrls(
                                          youtubeUrls.map((v_, k_) =>
                                            k === k_
                                              ? {
                                                  id: v_.id,
                                                  value: e.target.value,
                                                }
                                              : v_
                                          )
                                        );
                                      }}
                                    />
                                    <button
                                      style={{
                                        borderRadius: 20,
                                        width: 40,
                                        height: 40,
                                        fontWeight: "bold",
                                        marginLeft: 10,
                                      }}
                                      onClick={() => {
                                        setYoutubeUrls(
                                          youtubeUrls.filter(
                                            (v_, k_) => k !== k_
                                          )
                                        );
                                      }}
                                    >
                                      X
                                    </button>

                                    <ReactPlayer
                                      url={youtubeUrls[k].value}
                                      light={true}
                                      config={{
                                        youtube: {
                                          playerVars: { showinfo: 1 },
                                        },
                                      }}
                                      width={480}
                                      playing={true}
                                    />
                                  </div>
                                }
                              </div>
                            ))}

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                              }}
                            >
                              <button
                                typr="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  if (
                                    youtubeUrls.filter(
                                      (url) => url.value.length === 0
                                    ).length !== 0
                                  ) {
                                    return;
                                  }
                                  setYoutubeUrls([
                                    ...youtubeUrls,
                                    { value: "", id: makeId() },
                                  ]);
                                }}
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: 30,
                                  fontSize: 70,
                                  fontWeight: "bold",
                                  backgroundColor: "#cecece77",
                                }}
                              >
                                +
                              </button>
                              <button
                                typr="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  saveUserVideos();
                                }}
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: 30,
                                  fontSize: 20,
                                  fontWeight: "bold",
                                  marginLeft: 20,
                                  backgroundColor: "#cecece77",
                                }}
                              >
                                Enregistrer
                              </button>
                            </div>
                          </>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ minWidth: "4rem" }} />
                <div className="w-xl w-auto-sm no-shrink">
                  <div className="sticky">
                    <div className="list mb-5">
                      <div className="list-item list-overlay r">
                        <div className="media">
                          <a
                            href="item.detail.html#"
                            className="ajax media-content"
                            style={{
                              backgroundImage: "url(../assets/img/b17.jpg)",
                            }}
                          ></a>
                          <div className="media-action" />
                        </div>
                        <div className="list-content p-5 text-center">
                          <div className="list-body">
                            <a
                              href="item.detail.html#"
                              className="list-title title ajax h3 font-weight-bold"
                            >
                              Partager moi
                            </a>
                            <img src="https://chart.googleapis.com/chart?chs=150x150&cht=qr&chl=Hello%20world&choe=UTF-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <h6 className="text text-muted sr-item">Top tracks</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ############ Main END*/}
      </div>
      {/* ############ Content END*/}
    </div>
  );
};

export default Profile;
