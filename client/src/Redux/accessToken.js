import { createSlice } from '@reduxjs/toolkit';

export const accessTokenSlice = createSlice({
  name: 'accessToken',
  initialState: {token: ''},
  reducers: { 
    checker: (state) => {
      console.log(state);
    },
    setReduxAccessToken: (state, action) => {
      state.token = action.payload;
      }
    }
})

export const { checker, setReduxAccessToken } = accessTokenSlice.actions;

export default accessTokenSlice.reducer;