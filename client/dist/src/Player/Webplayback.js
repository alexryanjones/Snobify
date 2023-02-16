"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const currentTrack_1 = require("../Redux/currentTrack");
// import { setPlayState } from '../Redux/currentPlayState';
const deviceId_1 = require("../Redux/deviceId");
const playPlayer_svg_1 = __importDefault(require("../assets/playPlayer.svg"));
const pausePlayer_svg_1 = __importDefault(require("../assets/pausePlayer.svg"));
const backwards_svg_1 = __importDefault(require("../assets/backwards.svg"));
const forwards_svg_1 = __importDefault(require("../assets/forwards.svg"));
function WebPlayback() {
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const currentTrack = (0, react_redux_1.useSelector)((state) => state.currentTrack);
    const [player, setPlayer] = (0, react_1.useState)(undefined);
    const [is_paused, setPaused] = (0, react_1.useState)(true);
    const [current_track, setTrack] = (0, react_1.useState)(currentTrack);
    const dispatch = (0, react_redux_1.useDispatch)();
    // Set current track
    (0, react_1.useEffect)(() => {
        (0, currentTrack_1.setCurrentTrack)(currentTrack);
    }, [currentTrack]);
    // Player configuration
    (0, react_1.useEffect)(() => {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        window.onSpotifyWebPlaybackSDKReady = () => {
            const player = new window.Spotify.Player({
                name: 'Snobify',
                getOAuthToken: cb => { cb(token); },
                volume: 0.5
            });
            setPlayer(player);
            player.addListener('ready', ({ device_id }) => {
                dispatch((0, deviceId_1.setDeviceId)(device_id));
                console.log('Ready with Device ID', device_id);
            });
            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });
            player.connect();
            player.addListener('player_state_changed', (state => {
                if (!state) {
                    return;
                }
                setTrack(state.track_window.current_track);
                setPaused(state.paused);
            }));
        };
    }, []);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement("div", { className: "player" },
            current_track.name ?
                react_1.default.createElement("div", { className: 'playing-track' },
                    react_1.default.createElement("img", { src: current_track.album.images[0].url, className: "now-playing-cover", alt: "" }),
                    react_1.default.createElement("div", { className: 'playing-track-info' },
                        react_1.default.createElement("div", { className: "now-playing__name" }, current_track.name),
                        react_1.default.createElement("div", { className: "now-playing__artist" }, current_track.artists[0].name)))
                : null,
            react_1.default.createElement("div", { className: 'media-controls' },
                react_1.default.createElement("img", { className: "btn-spotify skip", src: backwards_svg_1.default, alt: 'back', onClick: () => { player.previousTrack(); } }),
                is_paused ? react_1.default.createElement("img", { className: "btn-spotify", src: playPlayer_svg_1.default, alt: 'play', onClick: () => { player.togglePlay(); } }) : react_1.default.createElement("img", { className: "btn-spotify", src: pausePlayer_svg_1.default, alt: 'pause', onClick: () => { player.togglePlay(); } }),
                react_1.default.createElement("img", { className: "btn-spotify skip", src: forwards_svg_1.default, onClick: () => { player.nextTrack(); } })))));
}
exports.default = WebPlayback;
