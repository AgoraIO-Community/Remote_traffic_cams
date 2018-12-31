"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PropTypes = __importStar(require("prop-types"));
var React = __importStar(require("react"));
exports.DateTimePickerView = function (_a) {
    var selected = _a.selected, children = _a.children;
    if (!selected) {
        return null;
    }
    return React.createElement("div", { children: children });
};
exports.DateTimePickerView.propTypes = {
    selected: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired,
};
exports.default = exports.DateTimePickerView;
