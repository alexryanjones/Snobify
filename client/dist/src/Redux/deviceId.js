"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDeviceId = exports.deviceIdSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.deviceIdSlice = (0, toolkit_1.createSlice)({
    name: 'deviceId',
    initialState: { deviceId: '' },
    reducers: {
        setDeviceId: (state, action) => {
            state.deviceId = action.payload;
        },
    },
});
exports.setDeviceId = exports.deviceIdSlice.actions.setDeviceId;
exports.default = exports.deviceIdSlice.reducer;
