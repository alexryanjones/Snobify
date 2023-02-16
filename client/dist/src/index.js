"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
require("bootstrap/dist/css/bootstrap.min.css");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
const App_1 = __importDefault(require("./App"));
const store_1 = __importDefault(require("./Redux/store"));
const react_redux_1 = require("react-redux");
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(react_1.default.createElement(react_redux_1.Provider, { store: store_1.default },
    react_1.default.createElement(App_1.default, null)));
