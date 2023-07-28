"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
class SetDB extends Set {
    filePath;
    // @ts-ignore
    constructor(filePath, ...values) {
        if (!filePath.endsWith(".json"))
            throw new Error("filePath needs to end with '.json' format!");
        super(values);
        this.filePath = filePath;
        if (fs_1.default.existsSync(filePath))
            this.load();
        else
            this.save();
    }
    save() {
        const values = Array.from(this);
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(values));
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
            const data = JSON.parse(fs_1.default.readFileSync(this.filePath, "utf8"));
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