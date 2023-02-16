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
const react_1 = __importDefault(require("react"));
const axios_1 = __importDefault(require("axios"));
const react_2 = require("react");
const react_redux_1 = require("react-redux");
const Main_1 = __importDefault(require("./Dashboard/Main"));
const Sidebar_1 = __importDefault(require("./Sidebar/Sidebar"));
const Login_1 = __importDefault(require("./Login/Login"));
const UseAuth_1 = __importDefault(require("./Login/UseAuth"));
const User_1 = __importDefault(require("./User"));
const Webplayback_1 = __importDefault(require("./Player/Webplayback"));
const HistoryAnalysis_1 = __importDefault(require("./NowPlaying/HistoryAnalysis"));
const CurrentlyPlaying_1 = __importDefault(require("./NowPlaying/CurrentlyPlaying"));
const currentUser_1 = require("./Redux/currentUser");
const code = new URLSearchParams(window.location.search).get('code');
function App() {
    const accessToken = (0, UseAuth_1.default)(code);
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [weeklyScore, setWeeklyScore] = (0, react_2.useState)(null);
    const currentTrack = (0, react_redux_1.useSelector)((state) => state.currentTrack);
    const currentUser = (0, react_redux_1.useSelector)((state) => state.currentUser);
    const dispatch = (0, react_redux_1.useDispatch)();
    // Get recently played tracks
    (0, react_2.useEffect)(() => {
        try {
            if (accessToken && currentUser) {
                const getHistory = () => __awaiter(this, void 0, void 0, function* () {
                    const response = yield (0, axios_1.default)({
                        method: 'post',
                        url: baseUrl + 'get-history',
                        data: {
                            accessToken: accessToken,
                            currentUser: currentUser
                        },
                    });
                    setWeeklyScore(response.data);
                });
                getHistory();
            }
        }
        catch (err) {
            console.log(err);
        }
    }, [accessToken, currentUser]);
    // Get user info
    (0, react_2.useEffect)(() => {
        try {
            if (accessToken) {
                const getUser = () => __awaiter(this, void 0, void 0, function* () {
                    const response = yield (0, axios_1.default)({
                        method: 'post',
                        url: baseUrl + 'user',
                        data: {
                            accessToken: accessToken,
                        },
                    });
                    dispatch((0, currentUser_1.setCurrentUser)(response.data));
                });
                getUser();
            }
        }
        catch (err) {
            window.alert('Could not get user: ', err);
        }
    }, [accessToken]);
    return (react_1.default.createElement("div", null, accessToken ? (react_1.default.createElement("div", { id: 'index' },
        react_1.default.createElement(User_1.default, null),
        react_1.default.createElement(Sidebar_1.default, { weeklyScore: weeklyScore }),
        react_1.default.createElement(Main_1.default, null),
        (currentTrack === null || currentTrack === void 0 ? void 0 : currentTrack.title.length) > 0 ? (react_1.default.createElement(CurrentlyPlaying_1.default, { currentTrack: currentTrack })) : weeklyScore ? (react_1.default.createElement(HistoryAnalysis_1.default, null)) : react_1.default.createElement("div", { style: { height: '90%', width: '30%', background: '#000000' } }),
        react_1.default.createElement(Webplayback_1.default, null))) : (react_1.default.createElement(Login_1.default, null))));
}
exports.default = App;
