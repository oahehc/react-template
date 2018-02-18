import initialState from './initialState';
import { googleSignUp, signOut, authState } from 'Api/firebase';

const userKey = 'USER_NAME';

export const types = {
  SIGN_UP: 'user/SIGN_UP',
  SIGN_UP_REQUEST: 'user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'user/SIGN_UP_FAILURE',

  SIGN_OUT: 'user/SIGN_OUT',
  SIGN_OUT_REQUEST: 'user/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'user/SIGN_OUT_FAILURE',

  USER_INIT: 'user/USER_INIT',
  USER_INIT_REQUEST: 'user/USER_INIT_REQUEST',
  USER_INIT_SUCCESS: 'user/USER_INIT_SUCCESS',
  USER_INIT_FAILURE: 'user/USER_INIT_FAILURE',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_REQUEST:
    case types.SIGN_OUT_REQUEST:
    case types.USER_INIT_REQUEST:
      return state.set('isLoading', true);
    case types.SIGN_UP_FAILURE:
    case types.SIGN_OUT_FAILURE:
    case types.USER_INIT_FAILURE:
      return state.set('isLoading', false);

    case types.SIGN_UP_SUCCESS:
    case types.USER_INIT_SUCCESS:
      localStorage.setItem(userKey, action.userName);
      return state
        .set('isLoading', false)
        .set('userName', action.userName);

    case types.SIGN_OUT_SUCCESS:
      localStorage.removeItem(userKey);
      return state
        .set('isLoading', false)
        .set('userName', '');

    default:
      return state;
  }
};

export const actions = {
  signUp: () => (dispatch, getState) => {
    dispatch({
      type: types.SIGN_UP_REQUEST,
    });
    return new Promise((resolve, reject) => {
      googleSignUp().then((result) => {
        dispatch({
          type: types.SIGN_UP_SUCCESS,
          userName: result.user.displayName,
        });
        resolve();
      }).catch((err) => {
        dispatch({
          type: types.SIGN_UP_FAILURE,
          err,
        });
        reject(err);
      });
    });
  },

  signOut: () => (dispatch, getState) => {
    dispatch({
      type: types.SIGN_OUT_REQUEST,
    });
    return new Promise((resolve, reject) => {
      signOut().then(() => {
        dispatch({
          type: types.SIGN_OUT_SUCCESS,
        });
        resolve();
      }).catch((err) => {
        dispatch({
          type: types.SIGN_OUT_FAILURE,
          err,
        });
        reject(err);
      });
    });
  },

  userInit: () => (dispatch, getState) => {
    dispatch({
      type: types.USER_INIT_REQUEST,
    });
    return new Promise((resolve, reject) => {
      authState().then((user) => {
        dispatch({
          type: types.USER_INIT_SUCCESS,
          userName: (user) ? user.displayName : '',
        });
        resolve(user);
      }).catch((err) => {
        dispatch({
          type: types.USER_INIT_FAILURE,
          err,
        });
        reject(err);
      });
    });
  },
};

