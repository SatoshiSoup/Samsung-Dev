import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { createLogger } from 'redux-logger';

import bucketReducer from './reducers/Bucket/bucketReducer';
import mainReducer from './reducers/Main/mainReducer';
import navReducer from './reducers/Nav/navReducer';

const combinedReducers = combineReducers({
  bucketReducer,
  mainReducer,
  navReducer

});

const logger = createLogger({
  level: 'info',
  collapsed: true,
  logger: console,
  predicate: (getState, action) => true
});
// Reducer to set global state to all reducers

const store = createStore(combinedReducers, applyMiddleware(thunk));

export default store;