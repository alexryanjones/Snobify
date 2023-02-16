"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Snobify_Logo_svg_1 = __importDefault(require("../assets/Snobify-Logo.svg"));
const client_id = process.env.REACT_APP_CLIENT_ID;
const response_type = 'code';
const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
const scope = 'streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-private%20user-read-playback-state%20user-modify-playback-state%20user-read-recently-played';
const authUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`;
function Login() {
    return (react_1.default.createElement("div", { className: 'blocker' },
        react_1.default.createElement("img", { id: 'login-logo', src: Snobify_Logo_svg_1.default, alt: 'logo' }),
        react_1.default.createElement("p", { id: 'login-text' }, "Inspiring musical diversity through AI"),
        react_1.default.createElement("a", { id: 'login-button', href: authUrl }, "Login with Spotify")));
}
exports.default = Login;
