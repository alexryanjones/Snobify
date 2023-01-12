import { createSlice } from '@reduxjs/toolkit';

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: {token: ''},
  reducers: { 
    setReduxAccessToken: (state, action) => {
      state.token = action.payload;
      }
    }
})

export const { setReduxAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;