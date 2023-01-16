import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import queueReducer from './queue';
import currentViewReducer from './currentView';
import currentUserReducer from './currentUser';
import currentPlayStateReducer from './currentPlayState'
import currentTrackReducer from './currentTrack'
import deviceIdReducer from './deviceId';


export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentPlayState: currentPlayStateReducer,
    currentView: currentViewReducer,
    currentUser: currentUserReducer,
    currentTrack: currentTrackReducer,
    deviceId: deviceIdReducer,
    queue: queueReducer,
  },
});