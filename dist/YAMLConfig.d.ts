interface Options<S extends any> {
    config: {
        filePath: string;
        typingPath: string;
    };
    schema: S;
}
declare const _default: <S extends unknown>(o: Options<S>) => S;
export default _default;
