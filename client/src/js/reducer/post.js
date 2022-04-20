import {
  GET_POSTS_FAIL,
  GET_POSTS_LOAD,
  GET_POSTS_SUCCESS,
  GET_USER_POSTS_SUCCESS,
  UPDATE_LIKES,
  ADD_COMMENT,
  REMOVE_COMMENT,
  GET_POST,
  UPDATE_POST
} from "../const/post";

const initialState = {
  posts: [],
  loadPosts: false,
  errors: null,
  tochange:{}
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POSTS_LOAD:
      return { ...state, loadPosts: true };
    case GET_POSTS_SUCCESS:
      return { ...state, loadPosts: false, posts: payload };
    case GET_USER_POSTS_SUCCESS:
      return { ...state, loadPosts: false, posts: payload };
    case GET_POSTS_FAIL:
      return { ...state, loadPosts: false, errors: payload };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loadPosts: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: { ...state.posts, comments: payload },
        loadPosts: false,
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
      case GET_POST:
      return { ...state, tochange:payload };

    default:
      return state;
  }
};
