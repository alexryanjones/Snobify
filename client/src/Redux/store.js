import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';
import currentViewReducer from './currentView';
import currentUserReducer from './currentUser';
import currentPlayStateReducer from './currentPlayState'

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentPlayState: currentPlayStateReducer,
    currentView: currentViewReducer,
    currentUser: currentUserReducer,
    queue: queueReducer,
  },
});