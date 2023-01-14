import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';
import currentViewReducer from './currentView';
import currentUserReducer from './currentUser';
import currentPlayStateReducer from './currentPlayState'
import currentTrackReducer from './currentTrack'

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentPlayState: currentPlayStateReducer,
    currentView: currentViewReducer,
    currentUser: currentUserReducer,
    currentTrack: currentTrackReducer,
    queue: queueReducer,
  },
});