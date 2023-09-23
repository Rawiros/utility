"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class MapDB extends Map {
    filePath;
    constructor(filePath, entries) {
        if (!filePath.endsWith(".json"))
            throw new Error("filePath needs to end with '.json' format!");
        super(entries);
        this.filePath = filePath;
        if (fs_1.default.existsSync(filePath))
            this.load();
        else
            this.save();
    }
    ;
    save() {
        const values = Array.from(this);
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(values));
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
            const data = JSON.parse(fs_1.default.readFileSync(this.filePath, "utf8"));
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