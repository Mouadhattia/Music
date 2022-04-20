import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UseCard from "./UserCard";
import { Link } from "react-router-dom";
import { followUser, unfollowUser } from "../js/action/user";

const UserProfile = () => {
  const toshow = useSelector((state) => state.userReducer.toshow);
  const user = useSelector((state) => state.userReducer.user);
  const [show, setShow] = useState(true);

  const loadUser = useSelector((state) => state.userReducer.loadUser);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getUser(toshow.user._id));
    
    
 
  }, [toshow, user]);

  return (
    <div>
      {!loadUser  ? (
        <div className="progress">
          <div className="indeterminate"></div>
        </div>
      ) : (
        <div style={{ maxWidth: "550px", margin: "0px auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "18px 0px",
              borderBottom: "1px solid grey",
            }}
          >
            <div>
              <img
                style={{
                  width: "160px",
                  height: "160px",
                  borderRadius: "80px",
                }}
                src={toshow.user.url}
              />
            </div>
            <div>
              <h4>
                {toshow.user.name}
                {toshow.user.followers.find(
                  (el) => el == user._id
                ) ? (
                  <a
                    style={{ marginLeft: "20px" }}
                    className="btn-floating btn-large waves-effect waves-light red"
                    onClick={() =>
                      dispatch(unfollowUser(toshow.user._id), setShow(false))
                    }
                  >
                    <i className="material-icons">clear</i>
                  </a>
                ) : (
                  <a
                    style={{ marginLeft: "20px" }}
                    className="btn-floating btn-large waves-effect waves-light green"
                    onClick={() =>
                      dispatch(followUser(toshow.user._id), setShow(true))
                    }
                  >
                    <i className="material-icons">add</i>
                  </a>
                )}
              </h4>
              <h6>{toshow.user.email} </h6>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "120%",
                }}
              >
                <h6>{toshow.posts.length} posts</h6>
                <h6>{toshow.user.followers.length} Followers</h6>
                <h6>{toshow.user.following.length} Following</h6>
              </div>
            </div>
          </div>
          <div className="gallery">
            {toshow.posts.map((el) => {
              return <UseCard el={el} current={toshow.user} key={el._id} />;
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile; 
