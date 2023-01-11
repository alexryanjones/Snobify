import { configureStore } from '@reduxjs/toolkit';
import accessTokenReducer from './accessToken';
import currentlySelectedTrackReducer from './currentlySelectedTrack';

export default configureStore({
  reducer: {
    accessToken: accessTokenReducer,
    currentlySelectedTrack: currentlySelectedTrackReducer
  },
});