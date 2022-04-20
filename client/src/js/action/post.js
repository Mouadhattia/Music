import axios from "axios";
import M from "materialize-css";
import {
  GET_POSTS_FAIL,
  GET_POSTS_LOAD,
  GET_POSTS_SUCCESS,
  UPDATE_LIKES,
  GET_USER_POSTS_SUCCESS,
  UPDATE_LIKES_FAIL,
  UPDATE_COMMENT_FAIL,
  UPDATE_POST,
  REMOVE_COMMENT,
  GET_POST,
} from "../const/post";
let URI = process.env.REACT_APP_API;

export const getPosts = () => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.get(URI + "/allpost", options);
    dispatch({ type: GET_POSTS_SUCCESS, payload: result.data.posts });
  } catch (error) {
    dispatch({ type: GET_POSTS_FAIL, payload: error });
    console.log(error);
  }
};

export const getUserPosts = () => async (dispatch) => {
  dispatch({ type: GET_POSTS_LOAD });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    let result = await axios.get(URI + "/mypost", options);
    dispatch({ type: GET_USER_POSTS_SUCCESS, payload: result.data.myposts });
  } catch (error) {
    dispatch({ type: GET_POSTS_FAIL, payload: error });
    console.log(error);
  }
};

export const addLike = (id) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let result = await axios.put(`/like/${id}`, "", options);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: result.data },
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload: error,
    });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
  }
};

export const deleteLike = (id) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    let res = await axios.put(`/unlike/${id}`, "", options);
    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload: error,
    });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
  }
};

export const addComment = (postId, formData) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.post(`/comment/${postId}`, formData, options);

    dispatch(getPosts());
  } catch (error) {
    dispatch({ type: UPDATE_COMMENT_FAIL, payload: error });
    M.toast({
      html: error.response.data.errors[0].msg,
      classes: "#e53935 red darken-1",
    });
    console.log(error);
  }
};

// remove comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  const options = {
    headers: {
      "Content-Type": "application/json",
      authorization: localStorage.getItem("token"),
    },
  };
  try {
    const res = await axios.delete(`/comment/${postId}/${commentId}`, options);
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    M.toast({
      html: "Comment deleted",
      classes: "#e53935 red darken-1",
    });
    dispatch(getPosts());
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  axios
    .delete(`/delete/${id}`)
    .then((res) => dispatch(getUserPosts()))
    .catch((err) => console.log(err));
};

export const deletePostA = (id) => async (dispatch) => {
  axios
    .delete(`/delete/${id}`)
    .then((res) => dispatch(getPosts()))
    .catch((err) => console.log(err));
};

export const getPost = (id) => async (dispatch) => {
  axios
    .get(URI + `/post/${id}`)
    .then((res) => dispatch({ type: GET_POST, payload: res.data.response }))
    .catch((err) => console.log(err));
};

export const editPost = (id, newPost) => async (dispatch) => {
  axios
    .put(URI + `/update/${id}`, newPost)
    .then((res) => {
      dispatch(getPosts());
      M.toast({ html: res.data.message, classes: "#43a047 green darken-1" });
    })
    .catch((err) => console.log(err));
};
