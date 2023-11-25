import { existsSync, writeFileSync } from 'fs';
import JS2TS from 'json-to-ts';
import YAML from 'yaml';

interface Options<S extends any> {
    config: {
        filePath: string,
        typingPath: string
    }
    schema: S
}

export default <S extends any>(o: Options<S>): S => {
    const chuj = [
        existsSync(o.config.filePath),
        existsSync(o.config.typingPath)
    ];

    if (!chuj[0] || chuj[1]) {
        const typings = [
            "declare global { _config: RootObject }",
            ...JS2TS(o.schema)
        ];

        const typings_meow = typings.join("\n")
            .replace("interface RootObject", "export default interface RootObject");

        if (!chuj[1])
            writeFileSync(o.config.typingPath, typings_meow);

        if (!chuj[0])
            writeFileSync(o.config.filePath, YAML.stringify(o.schema));
    };

    // @ts-ignore
    return global['_config'] = YAML.parse(o.config.filePath)
}