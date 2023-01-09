import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
  },
});