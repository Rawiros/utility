"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(type, args) {
    if (type === "user")
        return `https://discord.com/users/${args[0]}`;
    if (type === "channel")
        return `https://discord.com/channels/${args[0]}/${args[1]}`;
    if (type === "guild")
        return `https://discord.com/channels/${args[0]}`;
    if (type === "message")
        return `https://discord.com/channels/${args[0]}/${args[1]}/${args[2]}`;
    return "";
}
exports.default = default_1;
;
//# sourceMappingURL=getDirectURL.js.map