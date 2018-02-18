import initialState from './initialState';
import { googleSignUp, signOut } from 'Api/firebase';

const userKey = 'USER_NAME';
const defaultName = 'GUESS';

export const types = {
  SIGN_UP: 'user/SIGN_UP',
  SIGN_UP_REQUEST: 'user/SIGN_UP_REQUEST',
  SIGN_UP_SUCCESS: 'user/SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'user/SIGN_UP_FAILURE',

  SIGN_OUT: 'user/SIGN_OUT',
  SIGN_OUT_REQUEST: 'user/SIGN_OUT_REQUEST',
  SIGN_OUT_SUCCESS: 'user/SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'user/SIGN_OUT_FAILURE',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SIGN_UP_REQUEST:
    case types.SIGN_OUT_REQUEST:
      return state.set('isLoading', true);
    case types.SIGN_UP_FAILURE:
    case types.SIGN_OUT_FAILURE:
      return state.set('isLoading', false);

    case types.SIGN_UP_SUCCESS:
      localStorage.setItem(userKey, action.userName);
      return state
        .set('isLoading', false)
        .set('userName', action.userName);

    case types.SIGN_OUT_SUCCESS:
      localStorage.removeItem(userKey);
      return state
        .set('isLoading', false)
        .set('userName', defaultName);

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
};

