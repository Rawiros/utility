"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(priorityName) {
    if (!globalThis.process)
        return;
    const os = require('os');
    const { constants: { priority } } = os;
    if (os.getPriority() === priority[priorityName])
        return true;
    try {
        os.setPriority(priority[priorityName]);
    }
    catch {
        return false;
    }
    finally {
        return true;
    }
}
exports.default = default_1;
;
//# sourceMappingURL=setPriority.js.map