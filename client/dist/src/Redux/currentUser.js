"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentUser = exports.currentUserSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.currentUserSlice = (0, toolkit_1.createSlice)({
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
exports.setCurrentUser = exports.currentUserSlice.actions.setCurrentUser;
exports.default = exports.currentUserSlice.reducer;
