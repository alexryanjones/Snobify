import { createSlice } from '@reduxjs/toolkit';

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {queue: []},
  reducers : {
    setQueue: (state, action) => {
      state.queue = action.payload
    },
    addToQueue: (state, action) => {
      state.queue.push(action.payload)
    },
    moveToQueueFront: (state, action) => {
      state.queue[0] = action.payload;
    }
  }
})

export const { setQueue, addToQueue, moveToQueueFront } = queueSlice.actions;

export default queueSlice.reducer;