import { createSlice } from '@reduxjs/toolkit';

export const deviceIdSlice = createSlice({
  name: 'deviceId',
  initialState: { deviceId: '' },
  reducers: {
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
  },
});

export const { setDeviceId } = deviceIdSlice.actions;

export default deviceIdSlice.reducer;
