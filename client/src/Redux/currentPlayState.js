import { createSlice } from '@reduxjs/toolkit';

export const currentPlayStateSlice = createSlice({
  name: 'currentPlayState',
  initialState: { currentPlayState: false },
  reducers: {
    setPlayState: (state, action) => {
      state.currentPlayState = action.payload
    },
  },
});

export const { setPlayState } = currentPlayStateSlice.actions;

export default currentPlayStateSlice.reducer;
