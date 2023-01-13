import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: { user: {
    name: '',
    userId: '',
    image: '',
  } },
  reducers: {
    setCurrentUser: (state, action) => {
      state.user.name = action.payload.name;
      state.user.userId = action.payload.userId;
      state.user.image = action.payload.image;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;
