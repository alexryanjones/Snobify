import { createSlice } from '@reduxjs/toolkit';

export const currentTrackSlice = createSlice({
  name: 'currentTrack',
  initialState: {
    track: {
      title: 'No',
      artist: '',
      album: '',
      artwork: '',
      popularity: '',
      uri: ''
    },
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.track.title = action.payload.title;
      state.track.artist = action.payload.artist;
      state.track.album = action.payload.album;
      state.track.artwork = action.payload.artwork;
      state.track.uri = action.payload.uri;
      state.track.popularity = action.payload.popularity;
      
      console.log('current track changed to ', state.track.title);
    },
  },
});

export const { setCurrentTrack } = currentTrackSlice.actions;

export default currentTrackSlice.reducer;
