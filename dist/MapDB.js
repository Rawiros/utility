"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MapDB extends Map {
    _storageProvider;
    filePath;
    constructor(filePath, entries) {
        super(entries);
        if (globalThis?.process)
            this._storageProvider = require('fs');
        if (!filePath.endsWith(".json"))
            throw new Error("filePath needs to end with '.json' format!");
        this.filePath = filePath;
        if (this._storageProvider.existsSync(filePath))
            this.load();
        else
            this.save();
    }
    ;
    save() {
        const values = Array.from(this);
        this._storageProvider.writeFileSync(this.filePath, JSON.stringify(values));
    }
    ;
    set(key, value) {
        super.set(key, value);
        this.save();
        return this;
    }
    ;
    delete(key) {
        const result = super.delete(key);
        this.save();
        return result;
    }
    load() {
        try {
            const data = JSON.parse(this._storageProvider.readFileSync(this.filePath, "utf8"));
            for (const item of data)
                if (!this.has(item))
                    super.set(item[0], item[1]);
        }
        catch (err) {
            console.error("Something went wrong and we can't complete loading JSON file from", this.filePath, "\nErr:", err);
        }
        ;
    }
    ;
}
exports.default = MapDB;
;
//# sourceMappingURL=MapDB.js.map