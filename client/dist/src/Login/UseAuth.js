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
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const accessToken_1 = require("../Redux/accessToken");
const axios_1 = __importDefault(require("axios"));
function UseAuth(code) {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const [accessToken, setAccessToken] = (0, react_1.useState)();
    const [refreshToken, setRefreshToken] = (0, react_1.useState)();
    const [expiresIn, setExpiresIn] = (0, react_1.useState)();
    const dispatch = (0, react_redux_1.useDispatch)();
    // Get access token
    (0, react_1.useEffect)(() => {
        console.log(code, 'code code');
        try {
            const login = () => __awaiter(this, void 0, void 0, function* () {
                const response = yield axios_1.default.post(baseUrl + 'login', { code });
                setAccessToken(response.data.accessToken);
                dispatch((0, accessToken_1.setReduxAccessToken)(response.data.accessToken));
                setRefreshToken(response.data.refreshToken);
                setExpiresIn(response.data.expiresIn);
                window.history.pushState({}, null, '/');
            });
            login();
            // .catch(() => window.location = '/')
        }
        catch (err) {
            window.location = '/';
            window.alert('Could not log in: ', err);
        }
    }, [code]);
    // Refresh access token
    (0, react_1.useEffect)(() => {
        try {
            if (!refreshToken || !expiresIn)
                return;
            const interval = setInterval(() => {
                axios_1.default
                    .post(baseUrl + 'refresh', {
                    refreshToken,
                })
                    .then((response) => {
                    setAccessToken(response.data.access_token);
                    dispatch((0, accessToken_1.setReduxAccessToken)(response.data.accessToken));
                    setExpiresIn(response.data.expires_in);
                });
            }, (expiresIn - 60) * 1000);
            return () => clearInterval(interval);
        }
        catch (err) {
            window.alert('Could not refresh token: ', err);
        }
    }, [refreshToken, expiresIn]);
    return accessToken;
}
exports.default = UseAuth;
