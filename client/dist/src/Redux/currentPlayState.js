"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPlayState = exports.currentPlayStateSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.currentPlayStateSlice = (0, toolkit_1.createSlice)({
    name: 'currentPlayState',
    initialState: { currentPlayState: false },
    reducers: {
        setPlayState: (state, action) => {
            state.currentPlayState = action.payload;
        },
    },
});
exports.setPlayState = exports.currentPlayStateSlice.actions.setPlayState;
exports.default = exports.currentPlayStateSlice.reducer;
