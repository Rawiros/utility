import fs from 'fs';

export default class SetDB<T = any> extends Set<T> {
    filePath: string;

    // @ts-ignore
    constructor(filePath: string, ...values: readonly T[] | null) {
        if (!filePath.endsWith(".json"))
            throw new Error("filePath needs to end with '.json' format!");

        super(values);
        this.filePath = filePath;

        if (fs.existsSync(filePath))
            this.load()
        else this.save()
    }

    save() {
        const values = Array.from(this);
        fs.writeFileSync(this.filePath, JSON.stringify(values));
    };

    add(value: T) {
        const result = super.add(value);
        this.save();
        return result;
    };

    delete(value: T) {
        const result = super.delete(value);
        this.save();
        return result;
    };

    load() {
        try {
            const data = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

            for (const item of data)
                if (!this.has(item))
                    super.add(item);

        } catch (err) {
            console.error("Something went wrong and we can't complete loading JSON file from", this.filePath, "\nErr:", err);
        };
    };
};