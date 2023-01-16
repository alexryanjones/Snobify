import { createSlice } from '@reduxjs/toolkit';

export const currentTrackSlice = createSlice({
  name: 'currentTrack',
  initialState: {
      title: '',
      artist: '',
      album: '',
      artwork: '',
      popularity: 0,
      uri: ''
  },
  reducers: {
    setCurrentTrack: (state, action) => {
      state.title = action.payload.title;
      state.artist = action.payload.artist;
      state.album = action.payload.album;
      state.artwork = action.payload.artwork;
      state.uri = action.payload.uri;
      state.popularity = action.payload.popularity;
      console.log('current track changed to', state.title);
    },
  },
});

export const { setCurrentTrack } = currentTrackSlice.actions;

export default currentTrackSlice.reducer;
