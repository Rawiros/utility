"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const { constants: { priority } } = os_1.default;
function default_1(priorityName) {
    if (os_1.default.getPriority() === priority[priorityName])
        return true;
    try {
        os_1.default.setPriority(priority[priorityName]);
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