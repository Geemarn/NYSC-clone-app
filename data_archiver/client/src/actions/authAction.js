import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

//registeradmin  user
export const registerAdminUser = (newUser, history) => dispatch => {
  axios
    .post("routes/api/admin/register", newUser)
    .then(res => history.push("/admin_login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//register user
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("routes/api/user/register", newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login admin
export const loginAdmin = userData => dispatch => {
  axios
    .post("routes/api/admin/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //set token to LS
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//login user
export const loginUser = userData => dispatch => {
  axios
    .post("routes/api/user/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //set token to LS
      localStorage.setItem("jwtToken", token);
      //set token to auth header
      setAuthToken(token);
      //decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  //redirect to login
  window.location.href = "/login";
};
