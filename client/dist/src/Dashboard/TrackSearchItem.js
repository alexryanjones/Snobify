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
const play_svg_1 = __importDefault(require("../assets/play.svg"));
const queue_svg_1 = __importDefault(require("../assets/queue.svg"));
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const currentPlayState_1 = require("../Redux/currentPlayState");
const currentTrack_1 = require("../Redux/currentTrack");
// import { moveToQueueFront, addToQueue } from '../Redux/queue';
function TrackSearchItem({ track }) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const dispatch = (0, react_redux_1.useDispatch)();
    const { token } = (0, react_redux_1.useSelector)((state) => state.accessToken);
    const { deviceId } = (0, react_redux_1.useSelector)((state) => state.deviceId);
    // const { queue } = useSelector((state) => state.queue);
    // ADD TO QUEUE FUNCTION HERE
    const addToQueue = () => {
        try {
            axios_1.default.post(baseUrl + 'add-to-queue', {
                data: {
                    accessToken: token,
                    trackUri: track.uri,
                },
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    const handlePlay = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield axios_1.default.put(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, 
            // { uris: queue },
            { uris: [`${track.uri}`] }, {
                headers: { Authorization: `Bearer ${token}` },
            });
        }
        catch (err) {
            console.log(err);
        }
    });
    return (react_1.default.createElement("div", { className: 'search-result-item' },
        react_1.default.createElement("img", { className: 'search-artwork', src: track.artwork, alt: 'albumArt' }),
        react_1.default.createElement("div", { className: 'track-info' },
            react_1.default.createElement("div", { className: 'search-track-name' }, track.title),
            react_1.default.createElement("div", { className: 'search-artist-name' }, track.artist),
            react_1.default.createElement("div", { className: 'search-album-name' }, track.album)),
        react_1.default.createElement("div", { className: 'play-queue-icon' },
            react_1.default.createElement("img", { className: 'queue', src: queue_svg_1.default, alt: 'queueSVG', onClick: () => {
                    addToQueue();
                    dispatch(addToQueue(track.uri));
                } }),
            react_1.default.createElement("img", { className: 'play', src: play_svg_1.default, alt: 'playSVG', onClick: () => {
                    dispatch((0, currentTrack_1.setCurrentTrack)(track));
                    // dispatch(moveToQueueFront(track));
                    dispatch((0, currentPlayState_1.setPlayState)(true));
                    handlePlay();
                } }))));
}
exports.default = TrackSearchItem;
