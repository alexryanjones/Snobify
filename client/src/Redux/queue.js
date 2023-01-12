import { createSlice } from '@reduxjs/toolkit';

export const queueSlice = createSlice({
  name: 'queue',
  initialState: {queue: []},
  reducers : {
    addToQueue: (state, action) => {
      state.queue.push(action.payload)
    },
    play: (state, action) => {
      state.queue[0] = action.payload;
    }
  }
})

export const { addToQueue, play } = queueSlice.actions;

export default queueSlice.reducer;