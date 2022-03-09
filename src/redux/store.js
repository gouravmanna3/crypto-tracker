//import { createStore, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
// import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: true
});