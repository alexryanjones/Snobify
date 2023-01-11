import { createSlice } from '@reduxjs/toolkit';

export const currentlySelectedTrackSlice = createSlice({
  name: 'currentlySelectedTrack',
  initialState: {track: ''},
  reducers : {
    setCurrentlySelectedTrack: (state, action) => {
      state.track = action.payload
      console.log('redux', state.track);
    }
  }
})

export const { setCurrentlySelectedTrack } = currentlySelectedTrackSlice.actions;

export default currentlySelectedTrackSlice.reducer