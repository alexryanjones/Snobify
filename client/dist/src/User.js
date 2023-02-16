"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dropdown_svg_1 = __importDefault(require("./assets/icons/dropdown.svg"));
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
function User() {
    const { user } = (0, react_redux_1.useSelector)((state) => state.currentUser);
    return (react_1.default.createElement("div", null, user ? (react_1.default.createElement("div", { id: 'user-container' },
        react_1.default.createElement("img", { id: 'display-picture', src: user.image, alt: 'display' }),
        react_1.default.createElement("div", { id: 'display-name' }, user.name),
        react_1.default.createElement("img", { id: 'dropdown', src: dropdown_svg_1.default, alt: 'dropdown' }))) : null));
}
exports.default = User;
