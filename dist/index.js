"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EMPTY = exports.DOT = exports.Icon = exports.formatErrorStack = exports.setPriority = exports.SetDB = exports.MapDB = exports.joinString = exports.flattenObject = exports.getDirectURL = exports.getFormattedDirectURL = exports.recache = exports.getUsername = exports.Queue = exports.formatBytes = exports.sleep = exports.time2ms = exports.make_weak_cache = exports.YAMLConfig = exports.getCustomId = exports.Icons = void 0;
const icons_json_1 = require("./icons.json");
const getCustomId_1 = __importDefault(require("./getCustomId"));
exports.getCustomId = getCustomId_1.default;
const time2ms_1 = __importDefault(require("./time2ms"));
exports.time2ms = time2ms_1.default;
const flattenObject_1 = __importDefault(require("./flattenObject"));
exports.flattenObject = flattenObject_1.default;
const SetDB_1 = __importDefault(require("./SetDB"));
exports.SetDB = SetDB_1.default;
const MapDB_1 = __importDefault(require("./MapDB"));
exports.MapDB = MapDB_1.default;
const setPriority_1 = __importDefault(require("./setPriority"));
exports.setPriority = setPriority_1.default;
const formatErrorStack_1 = __importDefault(require("./formatErrorStack"));
exports.formatErrorStack = formatErrorStack_1.default;
const formatBytes_1 = __importDefault(require("./formatBytes"));
exports.formatBytes = formatBytes_1.default;
const getDirectURL_1 = __importDefault(require("./getDirectURL"));
exports.getDirectURL = getDirectURL_1.default;
const getUsername_1 = __importDefault(require("./getUsername"));
exports.getUsername = getUsername_1.default;
const getFormattedDirectURL_1 = __importDefault(require("./getFormattedDirectURL"));
exports.getFormattedDirectURL = getFormattedDirectURL_1.default;
const Queue_1 = __importDefault(require("./Queue"));
exports.Queue = Queue_1.default;
const YAMLConfig_1 = __importDefault(require("./YAMLConfig"));
exports.YAMLConfig = YAMLConfig_1.default;
icons_json_1.icons.Placeholder = icons_json_1.icons[icons_json_1.placeholder];
const EMPTY = "᲼";
exports.EMPTY = EMPTY;
const DOT = "•";
exports.DOT = DOT;
Object.defineProperties(globalThis, {
    EMPTY: { get() { return EMPTY; } },
    DOT: { get() { return DOT; } }
});
;
Math.toByte = degrees => {
    let b = Math.floor((degrees % 360) * 256 / 360);
    if (b < -128)
        b += 256;
    else if (b > 127)
        b -= 256;
    return b;
};
Math.limit = (value, min = 0, max = 128) => Math.min(Math.max(value, min), max);
Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
};
String.prototype.equals = function (value) {
    return this === value;
};
String.prototype.format = function (data = {}) {
    let text = String(this);
    for (const key of Object.keys(data))
        text = text.replaceAll(`{${key}}`, data[key]);
    return text;
};
String.prototype.limit = function (length = 1970) {
    if (this.length >= length)
        return this.slice(0, length - 3).concat("...");
    return this;
};
Boolean.prototype.is = function (value) {
    return this.valueOf() === value;
};
// Numbers
const rule = /\.0+$|(.\d*[1-9])0+$/;
const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
];
Number.prototype.format = function (digits = 2) {
    const value = this.valueOf();
    const item = lookup.slice().reverse().find(item => value >= item.value);
    return item ? (value / item.value).toFixed(digits).replace(rule, "$1") + item.symbol : "0";
};
Number.prototype.equals = function (value) {
    return this.valueOf() === value;
};
Number.prototype.formatBytes = function (decimals = undefined) {
    return (0, formatBytes_1.default)(this.valueOf(), decimals);
};
Number.prototype.addFlag = function (flag) {
    return this.valueOf() | (1 << flag);
};
Number.prototype.hasFlag = function (flag) {
    return (this.valueOf() & (1 << flag)) !== 0;
};
Number.prototype.removeFlag = function (flag) {
    return Math.max(this.valueOf() & ~(1 << flag), 0);
};
Number.prototype.limit = function (min = 0, max = 128) {
    return Math.min(Math.max(this.valueOf(), min), max);
};
// BigInts
BigInt.prototype.addFlag = function (flag) {
    return this.valueOf() | (1n << flag);
};
BigInt.prototype.hasFlag = function (flag) {
    return (this.valueOf() & (1n << flag)) !== 0n;
};
BigInt.prototype.removeFlag = function (flag) {
    return this.valueOf() < 0n ? 0n : this.valueOf() & ~(1n << flag);
};
;
BigInt.prototype.is = function (value) {
    return this === value.valueOf();
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
function recache(id) {
    if (!process)
        return;
    try {
        const realpath = require.resolve(id);
        delete require.cache[realpath];
        return require.cache[realpath] = require(realpath);
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
exports.recache = recache;
// expose global garbage collector
if (globalThis.process) {
    if (globalThis.process.argv0 !== "bun" && !globalThis.gc) {
        require("v8").setFlagsFromString('--expose_gc');
        globalThis.gc = require("vm").runInNewContext('gc');
    }
    // listen for errors
    // if (process.env.PM2_HOME) {
    //     process.on('uncaughtException', (err, origin) => console.log(origin, err));
    //     process.on('unhandledRejection', err => console.log("unhandledRejection", err));
    // };
}
;
function make_weak_cache(load, unload) {
    const cache = new Map();
    const cleanup = new FinalizationRegistry((key) => {
        const ref = cache.get(key);
        if (ref && !ref.deref()) {
            if (cache.delete(key) && unload)
                unload(key);
        }
    });
    return (key) => {
        const ref = cache.get(key);
        if (ref) {
            const cached = ref.deref();
            if (cached !== undefined)
                return cached;
        }
        ;
        const fresh = load(key);
        cache.set(key, new WeakRef(fresh));
        cleanup.register(fresh, `${key}`);
        return fresh;
    };
}
exports.make_weak_cache = make_weak_cache;
;
//# sourceMappingURL=index.js.map