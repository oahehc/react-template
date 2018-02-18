import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import Immutable, { Iterable } from 'immutable';
import { combineReducers } from 'redux-immutable';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './userReducer';
import userInitialState from './userReducer/initialState';

// merge reducer
const reducers = {
  userReducer,
};

// merge initialState
const initialStates = Immutable.Record({
  userReducer: userInitialState,
});

// set middlewares by environment
const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) return state.toJS();
  return state;
};
const middlewares = (isDev) ?
  composeWithDevTools(applyMiddleware(thunk, createLogger({ stateTransformer })))
  :
  compose(applyMiddleware(thunk));

export default createStore(combineReducers(reducers, initialStates), Immutable.Map(), middlewares);
