export default class MapDB<K = any, V = any> extends Map<K, V> {
    _storageProvider: any;
    filePath: string;
    constructor(filePath: string, entries?: readonly (readonly [K, V])[] | null);
    save(): void;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    load(): void;
}
