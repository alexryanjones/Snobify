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
const react_2 = __importDefault(require("react"));
function CurrentlyPlaying({ currentTrack }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [insult, setInsult] = (0, react_1.useState)('');
    const { user } = (0, react_redux_1.useSelector)((state) => state.currentUser);
    // Populate track judgement
    (0, react_1.useEffect)(() => {
        try {
            const generateInsult = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield (0, axios_1.default)({
                    method: 'post',
                    url: baseUrl + 'generate-insult',
                    data: {
                        trackInfo: currentTrack,
                        userInfo: user,
                    },
                });
                setInsult(response.data);
            });
            generateInsult();
        }
        catch (err) {
            window.alert('Could not generate insult, consider yourself lucky: ', err);
        }
    }, [currentTrack]);
    return (react_2.default.createElement("div", { id: 'currently-playing' },
        react_2.default.createElement("h3", { id: 'currently-playing-title', className: 'currently-playing-content' }, "Currently Playing"),
        react_2.default.createElement("div", { id: 'track-info', className: 'currently-playing-content' },
            react_2.default.createElement("h4", null, currentTrack.title),
            react_2.default.createElement("h5", null, currentTrack.artist)),
        react_2.default.createElement("img", { id: 'currently-playing-artwork', src: currentTrack.artwork, alt: 'artwork' }),
        react_2.default.createElement("div", { id: 'judgement-container' }, insult ? react_2.default.createElement("p", { className: 'judgement-text typing' }, insult) : null)));
}
exports.default = CurrentlyPlaying;
