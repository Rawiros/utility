"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (prefix) => {
    const Id = Math.random().toString(36).slice(2);
    if (prefix)
        return `${prefix}:${Id.slice(4)}`;
    return Id;
};
//# sourceMappingURL=getCustomId.js.map