import { mkdirSync } from "fs";
import path from "path";

function YAMLConfig<S extends any>(options: {
    config: {
        filePath: string,
        typingPath: string
    }
    schema: S
}) {
    if (!globalThis.process) return;
    const { existsSync, readFileSync, writeFileSync } = require('fs');
    const JS2TS = require('json-to-ts')?.default;
    const YAML = require('yaml');

    const configExists = existsSync(options.config.filePath);
    const configTypingsExists = existsSync(options.config.typingPath);
    const RegExpPrefix = "[RegExp]: ";

    if (!configExists || !configTypingsExists) {
        const typesDir = path.join(options.config.filePath, "@types");

        if (!configExists)
            if (!existsSync(typesDir))
                mkdirSync(typesDir, { recursive: true });

        writeFileSync(options.config.filePath, YAML.stringify(options.schema, (key: string, value: any) => {
            if (value.constructor.name === "RegExp")
                return "".concat(RegExpPrefix, value);

            return value;
        }));

        if (!configTypingsExists) {
            const typings = [
                ...JS2TS(options.schema, { rootName: "IConfig" }),
                "declare global { const _config: IConfig }"
            ].join("\n").replace("interface IConfig", "export default interface IConfig").replace(": object", ": RegExp");

            writeFileSync(options.config.typingPath, typings);
        };
    };

    // @ts-ignore
    return global['_config'] = YAML.parse(readFileSync(options.config.filePath, "utf8"), (key, value) => {
        if (typeof value == "string" && value.startsWith(RegExpPrefix))
            return eval(value.slice(RegExpPrefix.length));

        return value;
    }) as S;
}

export default YAMLConfig;


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