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
const react_bootstrap_1 = require("react-bootstrap");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const TrackSearchItem_1 = __importDefault(require("./TrackSearchItem"));
const FeaturedPlaylists_1 = __importDefault(require("./FeaturedPlaylists"));
const PlaylistView_1 = __importDefault(require("./PlaylistView"));
const react_2 = __importDefault(require("react"));
const spotifyApi = new spotify_web_api_node_1.default({
    clientId: process.env.REACT_APP_CLIENT_ID,
});
function DashboardMain() {
    const [search, setSearch] = (0, react_1.useState)('');
    const [searchResults, setSearchResults] = (0, react_1.useState)([]);
    const { playlist } = (0, react_redux_1.useSelector)((state) => state.currentView);
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    // Set access token
    (0, react_1.useEffect)(() => {
        if (!token)
            return;
        try {
            spotifyApi.setAccessToken(token);
        }
        catch (err) {
            window.alert('Could not set access token: ', err);
        }
    }, [token]);
    // Handle search query
    (0, react_1.useEffect)(() => {
        if (!search)
            return setSearchResults([]);
        if (!token)
            return;
        // cancels request if another request is made before promise is resolved
        try {
            let cancel = false;
            const searchTracks = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield spotifyApi.searchTracks(search);
                if (cancel)
                    return;
                const searchResultItems = response.body.tracks.items.map((track) => {
                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        artwork: track.album.images[0].url,
                        album: track.album.name,
                        popularity: track.popularity
                    };
                });
                setSearchResults(searchResultItems);
                return () => (cancel = true);
            });
            searchTracks();
        }
        catch (err) {
            window.alert('Counld not search tracks: ', err);
        }
    }, [token, search]);
    return (react_2.default.createElement("div", { id: 'dashboard' },
        react_2.default.createElement("div", { id: 'search-container' },
            react_2.default.createElement(react_bootstrap_1.Form.Control, { id: 'search', type: 'search', placeholder: 'Search', value: search, onChange: (e) => setSearch(e.target.value) }),
            react_2.default.createElement("div", { id: 'search-results-container', style: { overflowY: 'scroll' } }, searchResults.map((track) => (react_2.default.createElement(TrackSearchItem_1.default, { track: track, key: track.uri }))))),
        playlist.playlistName === 'Home' ? (react_2.default.createElement(FeaturedPlaylists_1.default, { key: 1 })) : (react_2.default.createElement(PlaylistView_1.default, { playlist: playlist, key: playlist.uri }))));
}
exports.default = DashboardMain;
