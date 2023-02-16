"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const currentView_1 = require("../Redux/currentView");
const react_1 = __importDefault(require("react"));
function FeaturedPlaylistItem({ playlist }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    return (react_1.default.createElement("div", { className: 'playlist-tile', onClick: () => dispatch((0, currentView_1.setCurrentView)(playlist)) },
        react_1.default.createElement("img", { className: 'playlist-artwork', src: playlist.playlistArtwork, alt: 'playlist-cover' }),
        react_1.default.createElement("div", { className: 'playlist-title' }, playlist.playlistName),
        react_1.default.createElement("div", { className: 'playlist-description' }, playlist.playlistDescription)));
}
exports.default = FeaturedPlaylistItem;
