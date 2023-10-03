"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const getUsername_1 = __importDefault(require("./getUsername"));
function default_1(type, args) {
    if (type === "user")
        return `[${(0, getUsername_1.default)(args[0])}](https://discord.com/users/${args[0].id})`;
    if (type === "channel")
        return `[${args[1]?.name || "Unknown"}](https://discord.com/channels/${args[0].id}/${args[1]?.id})`;
    if (type === "guild")
        return `[${args[0]?.name || "Unknown"}](https://discord.com/channels/${args[0].id})`;
    if (type === "message")
        return `[${args[2]?.author ? (0, getUsername_1.default)(args[2].author) + "'s" : "Message URL"}](https://discord.com/channels/${args[0].id}/${args[1].id}/${args[2].id})`;
    return "";
}
exports.default = default_1;
;
//# sourceMappingURL=getFormattedDirectURL.js.map