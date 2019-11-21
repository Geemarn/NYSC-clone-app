import axios from "axios";
import {
  GET_PROFILES,
  PROFILE_LOADING,
  GET_ERRORS,
  GET_PROFILE,
  GET_PROFILE2,
  CLEAR_CURRENT_PROFILE
} from "./types";

//create profile
export const createProfile = (addProfile, history) => dispatch => {
  axios
    .post("routes/api/profile", addProfile)
    .then(res => history.push("/mobilization_form2"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//add education
export const addEducation = (addEduData, history) => dispatch => {
  axios
    .post("routes/api/profile/education", addEduData)
    .then(res => history.push("/dashboard"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//add states
export const addStates = (addStateData, history) => dispatch => {
  axios
    .post("routes/api/profile/state", addStateData)
    .then(res =>
      dispatch({
        type: GET_PROFILE2,
        payload: {
          data: res.data,
          linkto: history.push("/success_dashboard")
        }
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// set profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

//edit profile
export const editProfile = (addProfile, history) => dispatch => {
  axios
    .post("routes/api/profile", addProfile)
    .then(res => history.push("/editmobilization_form2"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//get profile1 (1990 - 1999)
export const getProfiles1 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/1990-1999")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
//get profile2 (2000 - 2009)
export const getProfiles2 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/2000-2009")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
//get profile3 (2010 - 2019)
export const getProfiles3 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/2010-2019")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
//get profile4 (2020 - 2029)
export const getProfiles4 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/2020-2029")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
//get profile5 (2030 - 2039)
export const getProfiles5 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/2020-2029")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
//get all user profile
export const getProfiles6 = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/routes/api/profile/all")
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

//get dearch data
export const getSearch = searchData => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/routes/api/profile/all?search=${searchData}`)
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
