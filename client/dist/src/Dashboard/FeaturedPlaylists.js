"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const FeaturedPlaylistItem_1 = __importDefault(require("./FeaturedPlaylistItem"));
const react_2 = __importDefault(require("react"));
function FeaturedPlaylists() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [featuredPlaylists, setFeaturedPlaylists] = (0, react_1.useState)([]);
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const { currentView } = (0, react_redux_1.useSelector)((state) => state.currentView);
    // Get featured playlists 
    (0, react_1.useEffect)(() => {
        if (token) {
            try {
                (0, axios_1.default)({
                    method: 'post',
                    url: baseUrl + 'featured-playlists',
                    data: {
                        accessToken: token,
                    },
                }).then((res) => {
                    setFeaturedPlaylists(res.data);
                });
            }
            catch (err) {
                console.log(err);
            }
        }
    }, [token, currentView]);
    return (react_2.default.createElement("div", { className: 'list-container' },
        react_2.default.createElement("h2", { className: 'playlist-title' }, "Good morning"),
        react_2.default.createElement("div", { id: 'list-items' }, featuredPlaylists.map((playlist) => (react_2.default.createElement(FeaturedPlaylistItem_1.default, { playlist: playlist, key: playlist.playlistUri }))))));
}
exports.default = FeaturedPlaylists;
