"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveToQueueFront = exports.addToQueue = exports.setQueue = exports.queueSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
exports.queueSlice = (0, toolkit_1.createSlice)({
    name: 'queue',
    initialState: { queue: [] },
    reducers: {
        setQueue: (state, action) => {
            state.queue = action.payload;
        },
        addToQueue: (state, action) => {
            state.queue.push(`${action.payload}`);
        },
        moveToQueueFront: (state, action) => {
            state.queue[0] = `${action.payload}`;
        }
    }
});
_a = exports.queueSlice.actions, exports.setQueue = _a.setQueue, exports.addToQueue = _a.addToQueue, exports.moveToQueueFront = _a.moveToQueueFront;
exports.default = exports.queueSlice.reducer;
