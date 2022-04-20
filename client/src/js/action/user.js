import {
  LOAD_USER,
  LOGIN_USER,
  LOGOUT_USER,
  FAIL_USER,
  REGISTER_USER,
  CURRENT_USER,
  GET_USERS_LOAD,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  GET_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
} from "../const/user";
import axios from "axios";
import M from "materialize-css";
let URI = process.env.REACT_APP_API;

export const registerUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.email
      )
    ) {
      M.toast({
        html: "Ivalid email",
        classes: "#e53935 red darken-1",
      });
      return;
    }
    const result = await axios.post(URI + "/signup", user);
    dispatch({ type: REGISTER_USER, payload: result.data });
    console.log(result.data);

    axios
      .post(
        "https://api-5411188A-EF40-4B4D-8A87-1196AF33FC65.sendbird.com/v3/users",
        {
          user_id: result.data.user._id,
          nickname: result.data.user.name,
          profile_url: result.data.user.url,
        },
        {
          headers: {
            "Content-Type": "application/json; charset=utf8",
            "Api-Token": "6df5155a7e984c6380d03cbaac6241c979d6118d",
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    M.toast({ html: result.data.message, classes: "#43a047 green darken-1" });
    navigate("/login");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
    console.log(error);
  }
};

export const loginUser = (user, navigate) => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  try {
    const result = await axios.post(URI + "/signin", user);
    dispatch({ type: LOGIN_USER, payload: result.data });
    M.toast({ html: "signed in sucess", classes: "#43a047 green darken-1" });
    navigate("/");
  } catch (error) {
    dispatch({ type: FAIL_USER, payload: error.response.data });
    M.toast({
      html: error.response.data.error,
      classes: "#e53935 red darken-1",
    });
  }
};

export const getcurrent = () => async (dispatch) => {
  dispatch({ type: LOAD_USER });
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  try {
    let result = await axios.get(URI + "/current", options);
    dispatch({ type: CURRENT_USER, payload: result.data.user });
  } catch (error) {
    console.log(error);
  }
};

export const Logout = () => {
  return {
    type: LOGOUT_USER,
  };
};

export const getUsers = () => async (dispatch) => {
  try {
    let result = await axios.get(URI + "/users");
    dispatch({ type: GET_USERS_SUCCESS, payload: result.data.response });
  } catch (error) {
    dispatch({ type: GET_USERS_FAIL, payload: error });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  axios
    .delete(URI + `/deleteuser/${id}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => console.log(err));
};

export const editProfile = (id, newProfile) => async (dispatch) => {
  axios
    .put(URI + `/updateprofile/${id}`, newProfile)
    .then((res) => {
      dispatch(getcurrent());
      M.toast({ html: res.data.message, classes: "#43a047 green darken-1" });
    })
    .catch((err) => console.log(err));
};

export const getUser = (id) => async (dispatch) => {
  axios
    .get(URI + `/user/${id}`)
    .then((res) => dispatch({ type: GET_USER, payload: res.data }))
    .catch((err) => console.log(err));
};

export const followUser = (followId) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  axios
    .put(URI + "/follow", { followId }, options)
    .then((res) => {
      dispatch(getUser(followId));
    })
    .catch((err) => console.log(err));
};

export const unfollowUser = (unfollowId) => async (dispatch) => {
  const options = {
    headers: {
      authorization: localStorage.getItem("token"),
    },
  };

  axios
    .put(URI + "/unfollow", { unfollowId }, options)
    .then((res) => {
      dispatch(getUser(unfollowId));
    })
    .catch((err) => console.log(err));
};
