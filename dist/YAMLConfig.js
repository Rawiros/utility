"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const json_to_ts_1 = __importDefault(require("json-to-ts"));
const yaml_1 = __importDefault(require("yaml"));
function YAMLConfig(options) {
    const configExists = false;
    const configTypingsExists = false;
    const RegExpPrefix = "[RegExp]: ";
    if (!configExists || !configTypingsExists) {
        if (!configExists)
            (0, fs_1.writeFileSync)(options.config.filePath, yaml_1.default.stringify(options.schema, (key, value) => {
                if (value.constructor.name === "RegExp")
                    return "".concat(RegExpPrefix, value);
                return value;
            }));
        if (!configTypingsExists) {
            const typings = [
                ...(0, json_to_ts_1.default)(options.schema, { rootName: "IConfig" }),
                "declare global { const _config: IConfig }"
            ].join("\n").replace("interface IConfig", "export default interface IConfig").replace(": object", ": RegExp");
            (0, fs_1.writeFileSync)(options.config.typingPath, typings);
        }
        ;
    }
    ;
    // @ts-ignore
    return global['_config'] = yaml_1.default.parse((0, fs_1.readFileSync)(options.config.filePath, "utf8"), (key, value) => {
        if (typeof value == "string" && value.startsWith(RegExpPrefix))
            return eval(value.slice(RegExpPrefix.length));
        return value;
    });
}
exports.default = YAMLConfig;
// const config = YAMLConfig({
//     config: {
//         filePath: path.join(__dirname, "./test.yaml"),
//         typingPath: "./test.d.ts"
//     },
//     schema: {
//         user: {
//             autistic: true,
//             stupid: true,
//             flag: 0,
//             username: "gay69",
//             id: "1312"
//         },
//         filters: [
//             /go kill yourself uwu/igm
//         ]
//     }
// });
// // @ts-ignore
// console.log(global._config)
//# sourceMappingURL=YAMLConfig.js.map