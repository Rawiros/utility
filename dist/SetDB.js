"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SetDB extends Set {
    _storageProvider;
    filePath;
    // @ts-ignore
    constructor(filePath, ...values) {
        super(values);
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
    add(value) {
        const result = super.add(value);
        this.save();
        return result;
    }
    ;
    delete(value) {
        const result = super.delete(value);
        this.save();
        return result;
    }
    ;
    load() {
        try {
            const data = JSON.parse(this._storageProvider.readFileSync(this.filePath, "utf8"));
            for (const item of data)
                if (!this.has(item))
                    super.add(item);
        }
        catch (err) {
            console.error("Something went wrong and we can't complete loading JSON file from", this.filePath, "\nErr:", err);
        }
        ;
    }
    ;
}
exports.default = SetDB;
;
//# sourceMappingURL=SetDB.js.map