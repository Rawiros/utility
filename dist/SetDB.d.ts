export default class SetDB<T = any> extends Set<T> {
    _storageProvider: any;
    filePath: string;
    constructor(filePath: string, ...values: readonly T[] | null);
    save(): void;
    add(value: T): this;
    delete(value: T): boolean;
    load(): void;
}
