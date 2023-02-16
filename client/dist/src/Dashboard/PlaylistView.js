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
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const PlaylistItem_1 = __importDefault(require("./PlaylistItem"));
// import currentView from "../Redux/currentView";
const react_2 = __importDefault(require("react"));
const clock_svg_1 = __importDefault(require("../assets/clock.svg"));
function PlaylistView({ playlist }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const [playlistTracks, setPlaylistTracks] = (0, react_1.useState)([]);
    //  Get tracks of selected playlist
    (0, react_1.useEffect)(() => {
        try {
            const getPlaylists = () => __awaiter(this, void 0, void 0, function* () {
                if (token && playlist.playlistName !== 'Your Library') {
                    const response = yield (0, axios_1.default)({
                        method: 'post',
                        url: baseUrl + 'get-playlist',
                        data: {
                            playlistId: playlist.playlistId,
                            accessToken: token,
                        },
                    });
                    setPlaylistTracks(response.data);
                }
                else if (token && playlist.playlistName === 'Your Library') {
                    const response = yield (0, axios_1.default)({
                        method: 'post',
                        url: baseUrl + 'get-library',
                        data: {
                            accessToken: token,
                        },
                    });
                    setPlaylistTracks(response.data);
                }
            });
            getPlaylists();
        }
        catch (err) {
            window.alert('Could not get playlists: ', err);
        }
    }, [token, playlist]);
    return (react_2.default.createElement("div", { className: 'list-container' },
        react_2.default.createElement("h1", { className: 'playlist-title' }, playlist.playlistName),
        react_2.default.createElement("div", { id: 'playlist-info-header' },
            react_2.default.createElement("div", { style: { gridColumnStart: '1' } }, "#"),
            react_2.default.createElement("div", { style: { gridColumnStart: '3' } }, "TITLE"),
            react_2.default.createElement("div", { style: { gridColumnStart: '4', /* paddingLeft: '12.5px' */ } }, "ALBUM"),
            react_2.default.createElement("img", { src: clock_svg_1.default, alt: "clock", style: { gridColumnStart: '5', height: '20px', paddingLeft: '5px' } })),
        playlistTracks.map((track) => (react_2.default.createElement(PlaylistItem_1.default, { track: track, key: track.id })))));
}
exports.default = PlaylistView;
