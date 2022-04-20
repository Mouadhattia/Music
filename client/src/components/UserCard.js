import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, addLike, deleteLike, addComment ,getPost} from "../js/action/post";
import { Link } from "react-router-dom";




const UseCard = ({ el, current }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const loadPosts = useSelector((state) => state.postReducer.loadPosts);
  const [text, setText] = useState("");
  const formData = {};

  return (
    <div class="card" style={{ maxWidth:"600px", margin: "50px auto" }}>
      <div style={{ display: "flex" }}>
        <img
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "80px",
            margin: "10px auto",
          }}
          src={current.url}
        />
        <h5
          style={{
            fontWeight: "bold",
            textTransform: "capitalize",
            margin: "20px 10px",
            width: "82%",
          }}
        >
          {current.name}
          {/* {el.postedBy._id == current._id 
             && (
              <i
                class="material-icons"
                style={{ float: "right" }}
                onClick={() => dispatch(deletePost(el._id))}
              >
                delete_forever
              </i>
            )}

          {current.role == "admin" && el.postedBy._id == current._id && (
            <i
              class="material-icons"
              style={{ float: "right" }}
              onClick={() => dispatch(deletePost(el._id))}
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

          {el.postedBy._id == current._id &&
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
            ))} */}
        </h5>
      </div>

      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src={el.url} />
      </div>

      <div class="card-content">
        <i
          className="material-icons"
          style={{ color: "green", marginRight: "5px" }}
          onClick={() => {
            dispatch(addLike(el._id));
          }}
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
        <h6>{el.likes.length} likes</h6>

        <h5
          class="card-title activator grey-text text-darken-4"
          style={{ fontWeight: "bold" }}
        >
          {el.title}
          <i class="material-icons right">more_vert</i>
        </h5>
        <div class="card-content">
          <h6>{el.body}</h6>
        </div>
      </div>
      {/* <div class="card-reveal">
  <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
  <p>Here is some more information about this product that is only revealed once clicked on.</p>
</div> */}

      {el.comments.map((cmtr) => {
        return (
          <div className="cmtr card-action" style={{ display: "flex" }}>
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
              {" "}
              <span style={{ fontWeight: "bold" }}>{cmtr.user.name}</span>{" "}
              {cmtr.text}
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
    </div>
  );
};

export default UseCard;
