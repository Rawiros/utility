declare function YAMLConfig<S extends any>(options: {
    config: {
        filePath: string;
        typingPath: string;
    };
    schema: S;
}): S;
export default YAMLConfig;
