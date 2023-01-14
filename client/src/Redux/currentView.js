import { createSlice } from '@reduxjs/toolkit';

export const currentViewSlice = createSlice({
  name: 'currentView',
  initialState: { playlist: {
    playlistName: 'Home',
    playlistId: ''
  } },
  reducers: {
    setCurrentView: (state, action) => {
      state.playlist.playlistName = action.payload.playlistName;
      state.playlist.playlistId = action.payload.playlistId;
    },
  },
});

export const { setCurrentView } = currentViewSlice.actions;

export default currentViewSlice.reducer;
