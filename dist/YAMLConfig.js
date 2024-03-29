"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
function YAMLConfig(options) {
    if (!globalThis.process)
        return;
    const { existsSync, readFileSync, writeFileSync } = require('fs');
    const JS2TS = require('json-to-ts')?.default;
    const YAML = require('yaml');
    const configExists = existsSync(options.config.filePath);
    const configTypingsExists = existsSync(options.config.typingPath);
    const RegExpPrefix = "[RegExp]: ";
    if (!configExists || !configTypingsExists) {
        const typesDir = path_1.default.join(options.config.filePath, "..", "@types");
        if (!configExists)
            writeFileSync(options.config.filePath, YAML.stringify(options.schema, (key, value) => {
                if (value.constructor.name === "RegExp")
                    return "".concat(RegExpPrefix, value);
                return value;
            }));
        if (!configTypingsExists) {
            if (!existsSync(typesDir))
                return;
            const typings = [
                ...JS2TS(options.schema, { rootName: "IConfig" }),
                "declare global { const _config: IConfig }"
            ].join("\n").replace("interface IConfig", "export default interface IConfig").replace(": object", ": RegExp");
            writeFileSync(options.config.typingPath, typings);
        }
        ;
    }
    ;
    // @ts-ignore
    return global['_config'] = YAML.parse(readFileSync(options.config.filePath, "utf8"), (key, value) => {
        if (typeof value == "string" && value.startsWith(RegExpPrefix))
            return eval(value.slice(RegExpPrefix.length));
        return value;
    });
}
exports.default = YAMLConfig;
//# sourceMappingURL=YAMLConfig.js.map