import React, { useEffect, useState } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation, useParams } from "react-router";
import { getUsers } from "../js/action/user";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { Space, Table, Modal, DatePicker } from "antd";
import axios from "axios";
let URI = process.env.REACT_APP_API;

const Categories = () => {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const { type } = params;

  const gotUsers = useSelector((state) => state.userReducer.users);

  const position = [48.856614, 2.3522219];
  const [reservation, setReservation] = useState({
    name:"",
    lastName:"",
    email:"",
    tel:"",
    date:null,
    message:""

  })

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  function getQueryVariable(variable) {
    var query = location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split("=");
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
    console.log("Query variable %s not found", variable);
  }

  const searchQuery = getQueryVariable("searchQuery") || "";
  console.log({ searchQuery });
  let results =
    searchQuery.length > 0
      ? gotUsers.filter(
          (user) =>
            searchQuery
              .split(" ")
              .map((keyword) =>
                (user.company + " " + user.name + " " + user.surname)
                  ?.toLowerCase()
                  .includes(keyword)
              )
              .filter((e) => e).length
        )
      : gotUsers;
  results = results.filter((u) => u.role == type || type == "all");
  console.log({ results });

  const dataSource = [
    {
      key: "",
      name: "",
      address: "",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button
            className="btn btn-rounded btn-sm gd-primary text-white d-none d-lg-block"
            onClick={showModal}
          >
            Réserver
          </button>
        </Space>
      ),
    },
  ];
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    axios
    .post(
      URI +"/reservation",reservation
    )
    .then((res) => {
      console.log("sayé");
    })
    .catch((err) => console.log(err));

  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
    
    setReservation({...reservation,date:date})
  }
  function onOk(value) {
    console.log('onOk: ', value);
  }
  return (
    <div id="main" className="layout-row flex">
      <div id="content" className="flex">
        <div>
          <div className="page-content page-container" id="page-content">
            <div className="padding sr" id="list" data-plugin="list">
              <div>
                <div className="py-5">
                  <div className="heading pt-5 pb-3 d-flex">
                    <span className="flex" />
                  </div>
                  <div className="py-2 d-flex sr-item" id="filter-tag">
                    <div
                      className="no-shrink my-2"
                      onClick={() => navigate("/category/all")}
                    >
                      Tout
                    </div>
                    <div className="mx-3">
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/dj")}
                      >
                        Dj
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/artist")}
                      >
                        artist
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/maison")}
                      >
                        Maison Disque
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/manager")}
                      >
                        Manager
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/sponsor")}
                      >
                        Sponsor
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/studio")}
                      >
                        Studios
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/photographe")}
                      >
                        Photographe
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/son")}
                      >
                        Ingenieur Son
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/directeur")}
                      >
                        Directeur artistique
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/media")}
                      >
                        Media
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/cameraman")}
                      >
                        CameraMan
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/styliste")}
                      >
                        Styliste
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/beatmaker")}
                      >
                        BeatMaker
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/clipeur")}
                      >
                        Clipeur
                      </a>
                      <a
                        className="btn btn-sm btn-white m-1"
                        onClick={() => navigate("/category/salles")}
                      >
                        Salles
                      </a>
                    </div>
                  </div>
                </div>
                {type == "maison" && (
                  <div
                    id="map"
                    style={{ zIndex: "999", backgroundColor: "white" }}
                  >
                    <MapContainer center={position} zoom={10}>
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      {results.map((e) => (
                        <Marker
                          data="aa"
                          eventHandlers={{
                            click: () => navigate("/user/" + e._id),
                          }}
                          position={[e.lat, e.lon]}
                        >
                          <Tooltip>{e.name}</Tooltip>
                        </Marker>
                      ))}
                    </MapContainer>
                  </div>
                )}
                {results && results.length > 0 ? (
                  <div className="" style={{ marginTop: "5rem" }}>
                    <Modal
                      title="Prendre un rendez vous"
                      visible={isModalVisible}
                      onOk={handleOk}
                      onCancel={handleCancel}
                    >
                      <input className="reservation-input" type="text" placeholder="Nom" onChange={(e)=>setReservation({...reservation,name:e.target.value})} />
                      <input className="reservation-input" type="text" placeholder="Prenom" onChange={(e)=>setReservation({...reservation,lastName:e.target.value})} />
                      <input className="reservation-input" type="text" placeholder="Email" onChange={(e)=>setReservation({...reservation,email:e.target.value})} />
                      <input className="reservation-input" type="text" placeholder="Telephone" onChange={(e)=>setReservation({...reservation,tel:e.target.value})} />
                      <input className="reservation-input" type="text" placeholder="Message" onChange={(e)=>setReservation({...reservation,message:e.target.value})} />
                      <DatePicker showTime onChange={onChange} onOk={onOk} />

                    </Modal>
                    {type == "maison" ? (
                      <Table dataSource={results} columns={columns} />
                    ) : (
                      results.map((user) => (
                        <div className="col-4 col-md-3 col-lg-2 col-xl-1-8">
                          <div className="list-item r list-hover">
                            <div
                              onClick={() => navigate("/user/" + user._id)}
                              className="media"
                            >
                              <a
                                className="ajax media-content"
                                style={{
                                  backgroundImage: "url(" + user.url + ")",
                                }}
                              ></a>
                              <div className="media-action media-action-overlay">
                                <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                                <div className="dropdown-menu dropdown-menu-right" />
                              </div>
                            </div>
                            <div className="list-content text-center">
                              <div className="list-body">
                                <a className="list-title title ajax h-1x">
                                  {user.name}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="no-result">
                    <div className="p-5 text-center">
                      <h5>Aucune resultat trouvée</h5>
                    </div>
                  </div>
                )}
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

export default Categories;
