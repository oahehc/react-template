import initialState from './initialState';

export const types = {
  ACTION_TYPE: 'user/ACTION_TYPE',
  ACTION_TYPE_REQUEST: 'user/ACTION_TYPE_REQUEST',
  ACTION_TYPE_SUCCESS: 'user/ACTION_TYPE_SUCCESS',
  ACTION_TYPE_FAILURE: 'user/ACTION_TYPE_FAILURE',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ACTION_TYPE_REQUEST:
      return state.set('isLoading', true);
    case types.ACTION_TYPE_FAILURE:
      return state.set('isLoading', false);
    case types.ACTION_TYPE_SUCCESS:
      return state.set('isLoading', false);

    default:
      return state;
  }
};

export const actions = {
  action: () => (dispatch, getState) => {
    dispatch({
      type: types.ACTION_TYPE_REQUEST,
    });
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({
          type: types.ACTION_TYPE_SUCCESS,
        });
        resolve();
      }, 1000);
      // .catch((err) => {
      //   dispatch({
      //     type: types.ACTION_TYPE_FAILURE,
      //     err,
      //   });
      //   reject(err);
      // });
    });
  },
};

