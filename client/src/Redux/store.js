import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';
import currentViewReducer from './currentView';

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentView: currentViewReducer,
    queue: queueReducer,
  },
});