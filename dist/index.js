"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Icon = exports.formatErrorStack = exports.setPriority = exports.SetDB = exports.joinString = exports.flattenObject = exports.sleep = exports.time2ms = exports.getCustomId = exports.Icons = void 0;
const v8_1 = __importDefault(require("v8"));
const vm_1 = __importDefault(require("vm"));
const icons_json_1 = require("./icons.json");
const getCustomId_1 = __importDefault(require("./getCustomId"));
exports.getCustomId = getCustomId_1.default;
const time2ms_1 = __importDefault(require("./time2ms"));
exports.time2ms = time2ms_1.default;
const flattenObject_1 = __importDefault(require("./flattenObject"));
exports.flattenObject = flattenObject_1.default;
const SetDB_1 = __importDefault(require("./SetDB"));
exports.SetDB = SetDB_1.default;
const setPriority_1 = __importDefault(require("./setPriority"));
exports.setPriority = setPriority_1.default;
const formatErrorStack_1 = __importDefault(require("./formatErrorStack"));
exports.formatErrorStack = formatErrorStack_1.default;
icons_json_1.icons.Placeholder = icons_json_1.icons[icons_json_1.placeholder];
const EMPTY = "᲼";
const DOT = "•";
Object.assign(globalThis, { EMPTY, DOT });
;
String.prototype.equals = function (value) {
    return this === value;
};
String.prototype.format = function (data = {}) {
    let text = String(this);
    for (const key of Object.keys(data))
        text = text.replace(`{${key}}`, data[key]);
    return text;
};
String.prototype.limit = function (length = 1970) {
    if (this.length >= length)
        return this.slice(0, length - 3).concat("...");
    return this;
};
Number.prototype.equals = function (value) {
    return this === value;
};
Boolean.prototype.is = function (value) {
    return this === value;
};
Number.prototype.toBigInt = function () {
    return BigInt(this.valueOf());
};
BigInt.prototype.toNumber = function () {
    return Number(this.valueOf());
};
Boolean.prototype.toIcon = function () {
    return this ? icons_json_1.icons.Yes : icons_json_1.icons.No;
};
String.prototype.firstUpper = function () {
    return this.split("_").map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join("");
};
if (!globalThis.gc) {
    v8_1.default.setFlagsFromString('--expose_gc');
    global.gc = vm_1.default.runInNewContext('gc');
}
const Icon = (name, text) => {
    if (!text)
        return icons_json_1.icons[name];
    return `${icons_json_1.icons[name]} ${text}`;
};
exports.Icon = Icon;
const Icons = { ...icons_json_1.icons, Icon };
exports.Icons = Icons;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.sleep = sleep;
const joinString = (...lines) => lines.filter(line => !!line).join("\n");
exports.joinString = joinString;
//# sourceMappingURL=index.js.map