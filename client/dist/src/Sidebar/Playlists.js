"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const currentView_1 = require("../Redux/currentView");
const react_1 = __importDefault(require("react"));
function Playlists({ playlists }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (react_1.default.createElement("div", { id: 'playlists' }, playlists.length > 0 ? playlists.map(playlist => {
        return (react_1.default.createElement("p", { className: 'sidebar-item playlist-item', key: playlist.playlistName, onClick: () => dispatch((0, currentView_1.setCurrentView)(playlist)) }, playlist.playlistName));
    }) : react_1.default.createElement("p", null, "Loading")));
}
exports.default = Playlists;
