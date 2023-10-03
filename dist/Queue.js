"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Queue {
    queue = [];
    running = false;
    delay = 0;
    constructor(delay) {
        this.delay = delay || 0;
    }
    enqueue(asyncTask) {
        this.queue.push(asyncTask);
        if (!this.running)
            this.runNextTask();
    }
    async runNextTask() {
        if (this.queue.length > 0) {
            this.running = true;
            const task = this.queue.shift();
            if (task) {
                try {
                    await task();
                }
                catch (err) {
                    console.error(err);
                }
                finally {
                    if (this.delay !== 0)
                        await (0, _1.sleep)(this.delay);
                    this.runNextTask();
                }
            }
        }
        else
            this.running = false;
    }
}
exports.default = Queue;
//# sourceMappingURL=Queue.js.map