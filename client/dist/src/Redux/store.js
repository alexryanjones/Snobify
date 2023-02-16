"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const accessToken_1 = __importDefault(require("./accessToken"));
const queue_1 = __importDefault(require("./queue"));
const currentView_1 = __importDefault(require("./currentView"));
const currentUser_1 = __importDefault(require("./currentUser"));
const currentPlayState_1 = __importDefault(require("./currentPlayState"));
const currentTrack_1 = __importDefault(require("./currentTrack"));
const deviceId_1 = __importDefault(require("./deviceId"));
exports.default = (0, toolkit_1.configureStore)({
    reducer: {
        accessToken: accessToken_1.default,
        currentPlayState: currentPlayState_1.default,
        currentView: currentView_1.default,
        currentUser: currentUser_1.default,
        currentTrack: currentTrack_1.default,
        deviceId: deviceId_1.default,
        queue: queue_1.default,
    },
});
