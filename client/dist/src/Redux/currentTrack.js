"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentTrack = exports.currentTrackSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.currentTrackSlice = (0, toolkit_1.createSlice)({
    name: 'currentTrack',
    initialState: {
        title: '',
        artist: '',
        album: '',
        artwork: '',
        popularity: 0,
        uri: ''
    },
    reducers: {
        setCurrentTrack: (state, action) => {
            state.title = action.payload.title;
            state.artist = action.payload.artist;
            state.album = action.payload.album;
            state.artwork = action.payload.artwork;
            state.uri = action.payload.uri;
            state.popularity = action.payload.popularity;
        },
    },
});
exports.setCurrentTrack = exports.currentTrackSlice.actions.setCurrentTrack;
exports.default = exports.currentTrackSlice.reducer;
