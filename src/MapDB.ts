import fs from 'fs';

export default class MapDB<K = any, V = any> extends Map<K, V> {
    filePath: string;

    constructor(filePath: string, entries?: readonly (readonly [K, V])[] | null) {
        if (!filePath.endsWith(".json"))
            throw new Error("filePath needs to end with '.json' format!");

        super(entries);
        this.filePath = filePath;

        if (fs.existsSync(filePath))
            this.load();
        else
            this.save();
    };

    save() {
        const values = Array.from(this);
        fs.writeFileSync(this.filePath, JSON.stringify(values));
    };

    set(key: K, value: V) {
        super.set(key, value);

        this.save();
        return this;
    };

    delete(key: K) {
        const result = super.delete(key);

        this.save();
        return result;
    }

    load() {
        try {
            const data = JSON.parse(fs.readFileSync(this.filePath, "utf8"));

            for (const item of data)
                if (!this.has(item))
                    super.set(item[0], item[1]);

        } catch (err) {
            console.error("Something went wrong and we can't complete loading JSON file from", this.filePath, "\nErr:", err);
        };
    };
};