import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';

export default configureStore({
  reducer: {
    queue: queueReducer,
    accessToken: accessTokenReducer,
  },
});