"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setReduxAccessToken = exports.accessTokenSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.accessTokenSlice = (0, toolkit_1.createSlice)({
    name: 'accessToken',
    initialState: { token: '' },
    reducers: {
        setReduxAccessToken: (state, action) => {
            state.token = action.payload;
        }
    }
});
exports.setReduxAccessToken = exports.accessTokenSlice.actions.setReduxAccessToken;
exports.default = exports.accessTokenSlice.reducer;
