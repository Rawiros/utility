"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (err) => {
    if (typeof err.stack === "string") {
        const stack = Array.from(err.stack.match(/at (.*)/g) ?? []);
        if (stack)
            return stack.map(e => e.split(" ")[1]).join(" > ");
    }
    ;
    return "None";
};
//# sourceMappingURL=formatErrorStack.js.map