"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object')
            Object.assign(acc, flattenObject(obj[k], pre + k));
        else
            acc[pre + k] = obj[k];
        return acc;
    }, {});
}
exports.default = flattenObject;
;
//# sourceMappingURL=flattenObject.js.map