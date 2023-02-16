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
const Playlists_1 = __importDefault(require("./Playlists"));
const Snobify_Logo_svg_1 = __importDefault(require("../assets/Snobify-Logo.svg"));
const currentView_1 = require("../Redux/currentView");
const react_2 = __importDefault(require("react"));
function Sidebar({ weeklyScore }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const { user } = (0, react_redux_1.useSelector)((state) => state.currentUser);
    const [playlists, setPlaylists] = (0, react_1.useState)([]);
    const dispatch = (0, react_redux_1.useDispatch)();
    axios_1.default.get(baseUrl + 'load-insults');
    axios_1.default.get(baseUrl + 'filter-date');
    // Get playlists
    (0, react_1.useEffect)(() => {
        try {
            if (token) {
                const getPlaylists = () => __awaiter(this, void 0, void 0, function* () {
                    const response = yield (0, axios_1.default)({
                        method: 'post',
                        url: baseUrl + 'my-playlists',
                        data: {
                            userId: user,
                            accessToken: token,
                        },
                    });
                    setPlaylists(response.data);
                });
                getPlaylists();
            }
        }
        catch (err) {
            window.alert('Could not get playlists: ', err);
        }
    }, [token]);
    return (react_2.default.createElement("div", { className: 'sidebar' },
        react_2.default.createElement("div", { className: 'sidebar-nav' },
            react_2.default.createElement("div", { id: 'logo-container' },
                react_2.default.createElement("img", { id: 'logo', src: Snobify_Logo_svg_1.default, alt: 'logo' }),
                react_2.default.createElement("h1", { id: 'snobify' }, "Snobify")),
            react_2.default.createElement("h3", { id: 'this-week' }, "This week's score:"),
            react_2.default.createElement("h3", { id: 'score', style: { textDecoration: 'underline' } },
                weeklyScore,
                "% Basic"),
            react_2.default.createElement("p", { className: 'sidebar-item', onClick: () => dispatch((0, currentView_1.setCurrentView)({ playlistName: 'Home', playlistId: null })) }, "Home"),
            react_2.default.createElement("p", { className: 'sidebar-item', onClick: () => dispatch((0, currentView_1.setCurrentView)({ playlistName: 'Your Library', playlistId: null })) }, "Your Library")),
        react_2.default.createElement("div", { id: 'sidebar-divider' }),
        react_2.default.createElement(Playlists_1.default, { token: token, playlists: playlists })));
}
exports.default = Sidebar;
