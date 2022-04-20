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

const initialState = {
  user: null,
  loadUser: false,
  errors: null,
  isAuth: false,
  users: [],
  loadUsers: false,
  toshow: {},

};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER:
      return { ...state, loadUser: false, user: payload.user };
    case LOGIN_USER:
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      return { ...state, loadUser: false, user: payload.user, isAuth: true };
    case LOAD_USER:
      return { ...state, loadUser: true };
    case FAIL_USER:
      return { ...state, loadUser: false, errors: payload };
    case CURRENT_USER:
      return { ...state, loadUser: false, isAuth: true, user: payload };
    case LOGOUT_USER:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return { user: null, loadUser: false, errors: null, isAuth: false };
    case GET_USERS_LOAD:
      return { ...state, loadUsers: true };
    case GET_USERS_SUCCESS:
      return { ...state, users: payload, loadUsers: false };
    case GET_USERS_FAIL:
      return { ...state, loadUsers: false, errors: payload };
    case GET_USER:
      return { ...state, toshow: payload, loadUser: true };


    default:
      return state;
  }
};
