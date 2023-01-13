import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';
import currentViewReducer from './currentView';
import currentUserReducer from './currentUser';

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentView: currentViewReducer,
    currentUser: currentUserReducer,
    queue: queueReducer,
  },
});