import { combineReducers } from '@reduxjs/toolkit';
import demoReducer from './features/demoSlice';
import userReducer from './features/authenSlice'

const rootReducer = combineReducers({
  demo: demoReducer,
  user: userReducer,
});

export default rootReducer;
