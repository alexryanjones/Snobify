"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const currentTrack_1 = require("../Redux/currentTrack");
const currentPlayState_1 = require("../Redux/currentPlayState");
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
function PlaylistItem({ track }) {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const { deviceId } = (0, react_redux_1.useSelector)((state) => state.deviceId);
    // Format track duration
    const millisecondsToMinutes = Math.floor(track.duration / 60000) +
        ':' +
        (((track.duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
        ((track.duration % 60000) / 1000).toFixed(0);
    const handlePlay = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, { "uris": [`${track.uri}`] }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    return (react_1.default.createElement("div", { className: 'track-container', onClick: () => {
            dispatch((0, currentTrack_1.setCurrentTrack)(track));
            // dispatch(moveToQueueFront(track));
            dispatch((0, currentPlayState_1.setPlayState)(true));
            handlePlay();
        } },
        react_1.default.createElement("div", { className: 'track-id' }, track.id),
        react_1.default.createElement("img", { className: 'playlist-item-artwork', src: track.artwork, alt: 'album artwork' }),
        react_1.default.createElement("div", { className: 'playlist-item-track-info' },
            react_1.default.createElement("div", { className: 'playlist-item-track-title' }, track.title),
            react_1.default.createElement("div", null, track.artist)),
        react_1.default.createElement("div", null, track.album),
        react_1.default.createElement("div", null, millisecondsToMinutes)));
}
exports.default = PlaylistItem;
