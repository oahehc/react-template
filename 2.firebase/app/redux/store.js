import { createStore, applyMiddleware, compose } from 'redux';
import userReducer from './userReducer';
import thunk from 'redux-thunk';

const middleware = [
  thunk,
];

export default createStore(userReducer, compose(applyMiddleware(...middleware)));


// import { devTools } from 'redux-devtools';
// import { routerMiddleware } from 'react-router-redux';
// import createLogger from 'redux-logger';
// import configureReducers from '../reducers/configureReducers';
// import promiseMiddleware from '../middlewares/promiseMiddleware';
// import errorHandleMiddleware from '../middlewares/errorHandleMiddleware';
// import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

// export default reduxStore = (initialState = Immutable.Map()) => {
//   const reducers = {
//     userReducer: defaultReducer(require('Reducers/user/initialState').default),
//   };

//   const store = createStore(reducers, initialState);

//   // reducerRegistry.setChangeListener((reducers) => {
//   //   store.replaceReducer(configureReducers(reducers))
//   // });

//   return store;
// }

// const enhancer = () => {
//   let middleware, composeInternal;

//   const stateTransformer = (state) => {
//     if (Iterable.isIterable(state)) return state.toJS();
//     else return state;
//   };

//   if (!process.env.IS_NODE && process.env.NODE_ENV === 'development') {
//     middleware = [
//       errorHandleMiddleware,
//       thunk,
//       promiseMiddleware,
//       routerMiddleware(history),
//       createLogger({
//         stateTransformer
//       }),
//     ];
//     return composeWithDevTools(applyMiddleware(...middleware))
//   } else {
//     middleware = [
//       errorHandleMiddleware,
//       thunk,
//       promiseMiddleware,
//     ];
//     return compose(applyMiddleware(...middleware))
//   }
// }
