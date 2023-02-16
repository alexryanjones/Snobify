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
const react_2 = __importDefault(require("react"));
function HistoryAnalysis() {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [topTrack, setTopTrack] = (0, react_1.useState)('');
    const [topArtist, setTopArtist] = (0, react_1.useState)('');
    const [uniqueArtists, setUniqueArtists] = (0, react_1.useState)('');
    const [repeatedTracksPercentage, setRepeatedTracksPercentage] = (0, react_1.useState)('');
    const [explicitPercentage, setExplicitPercentage] = (0, react_1.useState)('');
    const [topYear, setTopYear] = (0, react_1.useState)('');
    // Get weekly insights
    (0, react_1.useEffect)(() => {
        try {
            const getInsights = () => __awaiter(this, void 0, void 0, function* () {
                const res = yield axios_1.default.get(baseUrl + 'analyse-history');
                setTopTrack(`Your top song was ${res.data.topTrack.title} by ${res.data.topTrack.artist} with ${res.data.topTrack.count} plays.`);
                setTopArtist(`Your most listened to artist was ${res.data.topArtist._id}. You played ${res.data.topArtist.count} of their songs.`);
                setUniqueArtists(`You listened to ${res.data.uniqueArtistCount} unique artists, that's ${res.data.uniqueArtistPercentage}% of your weekly listens!`);
                setRepeatedTracksPercentage(`${res.data.repeatedTracksPercentage}% of the songs you listened to were songs you'd already heard before.`);
                setExplicitPercentage(`${res.data.explicitPercentage}% of your songs contained explicit material.`);
                setTopYear(`You listened to ${res.data.topYear.count} songs released in ${res.data.topYear._id}, more than any other year.`);
            });
            getInsights();
        }
        catch (err) {
            window.alert('Could not get insights: ', err);
        }
    }, []);
    return (react_2.default.createElement("div", { id: 'weekly-stats' },
        react_2.default.createElement("h2", null, "Your weekly insights"),
        react_2.default.createElement("div", null, topTrack),
        react_2.default.createElement("div", null, topArtist),
        react_2.default.createElement("div", null, uniqueArtists),
        react_2.default.createElement("div", null, repeatedTracksPercentage),
        react_2.default.createElement("div", null, explicitPercentage),
        react_2.default.createElement("div", null, topYear)));
}
exports.default = HistoryAnalysis;
