import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLike,
  deleteLike,
  addComment,
  deletePostA,
  deleteComment,
  getPosts,
  getPost,
} from "../js/action/post";
import { Link } from "react-router-dom";
import { getUser } from "../js/action/user";

const Card = ({ el }) => {
  const dispatch = useDispatch();
  const current = useSelector((state) => state.userReducer.user);
  const [text, setText] = useState("");
  const formData = {};

  return (
    <div>
    { !current ?<div className="progress">
<div className="indeterminate"></div>
</div>:
    <div className="card" style={{ maxWidth: "600px", margin: "50px auto" }}>
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "80px",
            margin: "10px auto",
          }}
          src={el.postedBy.url}
        />
        <h5
          style={{
            fontWeight: "bold",
            textTransform: "capitalize",
            margin: "20px 10px",
            width: "82%",
          }}
        >
          <Link
            to={`/profile/${el.postedBy._id}`}
            onClick={() => dispatch(getUser(el.postedBy._id))}
          >
            {el.postedBy.name}
          </Link>
          {el.postedBy._id == current._id 
             && (
              <i
                class="material-icons"
                style={{ float: "right" }}
                onClick={() => dispatch(deletePostA(el._id))}
              >
                delete_forever
              </i>
            )}

          {current.role == "admin" && (
            <i
              class="material-icons"
              style={{ float: "right" }}
              onClick={() => dispatch(deletePostA(el._id))}
            >
              delete_forever
            </i>
          )}

          {el.postedBy._id == current._id 
             && (
              <Link to="/edit">
                <i
                  class="material-icons"
                  style={{ float: "right" }}
                  onClick={() => dispatch(getPost(el._id))}
                >
                  edit
                </i>
              </Link>
            )}

          {
            (current.role == "admin" && (
              <Link to="/edit">
                <i
                  class="material-icons"
                  style={{ float: "right" }}
                  onClick={() => dispatch(getPost(el._id))}
                >
                  edit
                </i>
              </Link>
            ))}
        </h5>
      </div>

      <div className="card-image waves-effect waves-block waves-light">
        <img className="activator" src={el.url} />
      </div>

      <div className="card-content">
        <div style={{width:"60px"}}>
        <i
          className="material-icons"
          style={{ color: "green",marginRight:"5px"}}
          onClick={() => dispatch(addLike(el._id))}
        >
          thumb_up
        </i>
        <i
          className="material-icons"
          style={{ color: "red" }}
          onClick={() => dispatch(deleteLike(el._id))}
        >
          thumb_down
        </i>
        </div>
        <h6>{el.likes.length} likes</h6>

        <h5
          className="card-title activator grey-text text-darken-4"
          style={{ fontWeight: "bold" }}
        >
          {el.title}
          <i className="material-icons right">more_vert</i>
        </h5>
        <div className="card-content">
          <h6>{el.body}</h6>
        </div>
      </div>
      {/* <div className="card-reveal">
  <span className="card-title grey-text text-darken-4">Card Title<i className="material-icons right">close</i></span>
  <p>Here is some more information about this product that is only revealed once clicked on.</p>
</div> */}

      {el.comments.map((cmtr) => {
        return (
          <div
            className="cmtr card-action"
            style={{ display: "flex", maxWidth: "550px" }}
          >
            <i
              class="material-icons"
              style={{ float: "left" }}
              onClick={() => {
                dispatch(deleteComment(el._id, cmtr._id), dispatch(getPosts()));
              }}
            >
              clear
            </i>

            <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "80px",
                margin: "21px 0px",
              }}
              src={cmtr.user.url}
            />
            <h6
              key={cmtr._id}
              style={{ margin: "21px 6px", padding: "5px 5px" }}
            >
              <span style={{ fontWeight: "bold", maxWidth: "500px" }}>
                {cmtr.user.name}
              </span>
              <p style={{ Width: "300px" }}>{cmtr.text}</p>
            </h6>
          </div>
        );
      })}
      <form
        style={{ margin: "10px 25px" }}
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addComment(el._id, { ...formData, text }));

          setText("");
        }}
      >
        <input
          type="text"
          placeholder="add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </form>
    </div>}
    </div>
  );
};

export default Card;
