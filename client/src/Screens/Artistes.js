import React, { useEffect } from "react";
import * as Icon from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getUsers } from "../js/action/user";
import { CURRENT_USER } from "../js/const/user";

const Artistes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const users = useSelector((state) => state.userReducer.users);
  const current = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <div id="main" className="layout-row flex">
      {/* ############ Content START*/}
      <div id="content" className="flex ">
        {/* ############ Main START*/}
        <div>
          <div className="page-content page-container" id="page-content">
            <div
              className="padding sr"
              id="list"
              data-plugin="list"
              data-page={50}
            >
              <div className="page-hero">
                <div className="media bg-media">
                  <div className="media-content"></div>
                </div>
                <div className="pos-rlt">
                  <h1 className="display-3 font-weight-bold text-white">
                    Top Artistes
                  </h1>
                </div>
              </div>
              <div className="d-lg-flex pos-rlt">
                <div className="flex">
                  <div className="heading pt-5 pb-3 d-flex ">
                    <div>
                      <div className="text-muted sr-item">Top</div>
                      <h5 className="text-highlight sr-item">Artistes</h5>
                    </div>
                    <span className="flex" />
                  </div>

                  <div className="row list list-row list-index ">
                    {users &&
                      users.length &&
                      users
                        .filter(
                          (e) => e._id != current?._id && e.role == "artist"
                        )
                        .map((user) => (
                          <div
                            className="col-12"
                            data-id={427101360}
                            data-category="Pop"
                            data-tag="USA"
                            data-source="https://audio-ssl.itunes.apple.com/apple-assets-us-std-000001/AudioPreview128/v4/03/78/b5/0378b505-0651-5d37-abaf-fdace32fa0a1/mzaf_4885861497912518049.plus.aac.p.m4a"
                          >
                            <div className="list-item r">
                              <div className="media ">
                                <a
                                  className="ajax media-content "
                                  style={{
                                    backgroundImage: "url(" + user.url + ")",
                                  }}
                                ></a>
                                <div className="media-action media-action-overlay">
                                  <button
                                    className="btn btn-icon no-bg no-shadow hide-row"
                                    data-toggle-class=""
                                  >
                                    <Icon.Heart />
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
                              <div
                                className="list-content text-center"
                                onClick={() => navigate("/user/" + user._id)}
                              >
                                <div className="list-body ">
                                  <a className="list-title title ajax h-1x">
                                    {user.name}
                                  </a>
                                  <a className="list-subtitle d-block text-muted h-1x subtitle ajax ">
                                    {user.description}
                                  </a>
                                </div>
                              </div>
                              <div className="list-action  show-row">
                                <div className="d-flex align-items-center">
                                  <div className="px-3 text-sm text-muted d-none d-md-block num">
                                    {user.followers.length} followers
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

                                  <div className="dropdown-menu dropdown-menu-right" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                  <div className="no-result hide">
                    <div className="p-5 text-center">
                      <h5>Nothing Found</h5>
                      <small>
                        It seems we can’t find what you’re looking for.
                      </small>
                    </div>
                  </div>
                  <div className="d-flex py-3 justify-content-center hide">
                    <ul className="pagination pagination-sm" />
                  </div>
                </div>
                <div style={{ minWidth: "4rem" }} />
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

export default Artistes;
