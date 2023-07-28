export default class SetDB<T = any> extends Set<T> {
    filePath: string;
    constructor(filePath: string, ...values: readonly T[] | null);
    save(): void;
    add(value: T): this;
    delete(value: T): boolean;
    load(): void;
}
