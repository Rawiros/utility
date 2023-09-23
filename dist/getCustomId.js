"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (namespace) => {
    const Id = Math.random().toString(36).slice(2);
    if (namespace)
        return `${namespace}:${Id.slice(4)}`;
    return Id;
};
//# sourceMappingURL=getCustomId.js.map