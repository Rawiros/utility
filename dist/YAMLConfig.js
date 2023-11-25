"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const json_to_ts_1 = __importDefault(require("json-to-ts"));
const yaml_1 = __importDefault(require("yaml"));
exports.default = (o) => {
    const chuj = [
        (0, fs_1.existsSync)(o.config.filePath),
        (0, fs_1.existsSync)(o.config.typingPath)
    ];
    if (!chuj[0] || chuj[1]) {
        const typings = [
            "declare global { _config: RootObject }",
            ...(0, json_to_ts_1.default)(o.schema)
        ];
        const typings_meow = typings.join("\n")
            .replace("interface RootObject", "export default interface RootObject");
        if (!chuj[1])
            (0, fs_1.writeFileSync)(o.config.typingPath, typings_meow);
        if (!chuj[0])
            (0, fs_1.writeFileSync)(o.config.filePath, yaml_1.default.stringify(o.schema));
    }
    ;
    // @ts-ignore
    return global['_config'] = yaml_1.default.parse(o.config.filePath);
};
//# sourceMappingURL=YAMLConfig.js.map