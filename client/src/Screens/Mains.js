import React, { useState, useEffect } from "react";
import b9 from "../img/b9.jpg";
import * as Icon from "react-feather";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Player from "../components/Player";

const Mains = () => {
  const navigate = useNavigate();
  const [topMusic, setTopMusic] = useState([]);
  useEffect(() => {
    const URI = process.env.REACT_APP_API;
    axios.get(URI + "/allpost").then((res) => setTopMusic([...res.data.posts]));
  }, []);

  const [play, setplay] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState(
    "http://example.com/audio.mp3"
  );

  const handlePlay = (src) => {
    setplay(true);
    setSelectedAudio(src);
  };
  return (
    <div id="main" className="layout-row flex">
      {play && <Player src={selectedAudio} />}
      {/* ############ Content START*/}
      <div id="content" className="flex">
        {/* ############ Main START*/}
        <div>
          <div className="page-content page-container" id="page-content">
            <div className="padding sr">
              <div className="page-hero">
                <div className="media bg-media">
                  <div
                    className="media-content"
                    style={{ backgroundImage: "url(../assets/img/b9.jpg)" }}
                  />
                </div>
                <div
                  className="slick"
                  data-plugin="slick"
                  data-option="{
            slidesToShow: 1,
        slidesToScroll: 1,
            dots: true,
            arrows: false,
            fade: true,
            autoplay: false,
            rtl: false
          }"
                >
                  <div>
                    <div className="pos-rlt">
                      <h2 className="display-3 font-weight-bold text-white">
                        Créer votre compte pour
                        <b style={{ color: "#8e44ad" }}>
                          {" "}
                          <br />
                          3,99€
                        </b>
                        seulement/mois
                      </h2>
                      <div className="col-6 px-0 py-3 text-muted" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="heading pt-5 pb-3 d-flex">
                <div>
                  <h5 className="text-highlight sr-item">Catégories</h5>
                </div>
                <span className="flex" />
              </div>
              <div className="slick slick-visible slick-arrow-top row sr-item">
                <div
                  onClick={() => navigate("/category/dj")}
                  className="col-2"
                  data-id={378918899}
                  data-category="Dance"
                  data-tag="Canada"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/c3/6c/db/c36cdbd0-304b-11b0-128d-eda635333cc8/mzaf_1033589088272334209.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/123/123581.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">DJ</a>
                        <a className="list-subtitle d-block text-muted h-1x subtitle ajax"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/artist")}
                  className="col-2"
                  data-id={439575216}
                  data-category="Rap"
                  data-tag="USA"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/8f/84/bd/8f84bd09-94d3-d6f1-5fca-4b61d7ba135a/mzaf_69877628019454373.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/128/3048/3048387.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Artistes</a>
                        <a className="list-subtitle d-block text-muted h-1x subtitle ajax"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/maison")}
                  className="col-2"
                  data-id={374705210}
                  data-category="Rap"
                  data-tag="USA"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/dc/c4/0b/dcc40b4d-283b-e9a2-6209-ca988087cc0e/mzaf_8137717147287964110.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/2037/2037746.png)",
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
                          Maison de disques
                        </a>
                        <a className="list-subtitle d-block text-muted h-1x subtitle ajax"></a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/manager")}
                  className="col-2"
                  data-id={438654695}
                  data-category="Dance"
                  data-tag="France"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c1/60/68/c1606821-459e-0575-ad3b-6b291f2dbf66/mzaf_3521330005736623852.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://lh3.googleusercontent.com/IMoUdHvS3SvyajU2bv1D5Df7-_LV-8GdAVQ-RQ6hmCgco3FDsDTD8t8qtJQJXrX8pWVK)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Managers</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/sponsor")}
                  className="col-2"
                  data-id={416888150}
                  data-category="Dance"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview118/v4/80/9c/c6/809cc6e9-c2e4-f300-921c-e37b5a4a6569/mzaf_4199798196739675159.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/1496/1496134.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Sponsors</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/studio")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/3225/3225415.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Studios</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/photographe")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://png.pngtree.com/png-vector/20190810/ourlarge/pngtree-camera-image-photo-photography-flat-color-icon-vector-icon-png-image_1654626.jpg)",
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
                          Photographe
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/son")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://static.vecteezy.com/system/resources/previews/001/196/957/large_2x/flat-icon-microphone-png.png)",
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
                          Ingernieur son
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/directeur")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://i.pinimg.com/736x/5f/40/6a/5f406ab25e8942cbe0da6485afd26b71.jpg)",
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
                          Directeur artistique
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/media")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/3578/3578749.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Media</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/camerman")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://www.pngkey.com/png/detail/40-409666_13-photographer-with-camera-silhouette-png-transparent-cameraman.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">CameraMan</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/styliste")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/94/94054.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Styliste</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/beatmaker")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://www.pinclipart.com/picdir/middle/530-5307080_music-maker-jam-logo-png-clipart-png-download.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">BeatMaker</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/clipeur")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://us.123rf.com/450wm/arcady31/arcady311404/arcady31140400049/27896085-clapper-bord-ic%C3%B4ne.jpg?ver=6)",
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
                          Clipeur/réalisation
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  onClick={() => navigate("/category/salles")}
                  className="col-2"
                  data-id={408576846}
                  data-category="Rap"
                  data-tag="England"
                  data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/c9/1f/83/c91f83b2-38c7-3a93-fabe-2da29dc5c2a8/mzaf_5271705754245759426.plus.aac.p.m4a"
                >
                  <div className="list-item slick-item r list-hover mb-3">
                    <div className="media">
                      <a
                        className="ajax media-content"
                        style={{
                          backgroundImage:
                            "url(https://w7.pngwing.com/pngs/1018/723/png-transparent-computer-icons-office-symbol-room-office-miscellaneous-building-logo.png)",
                        }}
                      ></a>
                      <div className="media-action media-action-overlay">
                        <button className="btn btn-raised btn-icon btn-rounded bg--white btn-play" />

                        <div className="dropdown-menu dropdown-menu-right" />
                      </div>
                    </div>
                    <div className="list-content text-center">
                      <div className="list-body">
                        <a className="list-title title ajax h-1x">Salles</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="heading pt-5 pb-3 d-flex">
                <div>
                  <div className="text-muted sr-item">Music</div>
                  <h5 className="text-highlight sr-item">Populaires</h5>
                </div>
                <span className="flex" />
              </div>
              <div className="row row-md">
                {topMusic.map((one) => (
                  <div className="col-4 col-md-3 col-lg-2 col-xl-1-8">
                    <div className="list-item r list-hover">
                      <div
                        className="media"
                        onClick={() => handlePlay(one.url)}
                      >
                        <a
                          className="ajax media-content"
                          style={{
                            backgroundImage: "url(" + one.img + ")",
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
                            {one.title}
                          </a>
                          <a className="list-subtitle d-block text-muted h-1x subtitle ajax">
                            {one.description}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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

export default Mains;
