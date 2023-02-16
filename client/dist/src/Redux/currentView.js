"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentView = exports.currentViewSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.currentViewSlice = (0, toolkit_1.createSlice)({
    name: 'currentView',
    initialState: { playlist: {
            playlistName: 'Home',
            playlistId: ''
        } },
    reducers: {
        setCurrentView: (state, action) => {
            state.playlist.playlistName = action.payload.playlistName;
            state.playlist.playlistId = action.payload.playlistId;
            console.log('curr view set to', state.playlist.playlistName, state.playlist.playlistId);
        },
    },
});
exports.setCurrentView = exports.currentViewSlice.actions.setCurrentView;
exports.default = exports.currentViewSlice.reducer;
