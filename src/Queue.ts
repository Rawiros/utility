import { sleep } from ".";

export default class Queue<T> {
    private queue: Array<() => Promise<T>> = [];
    private running: boolean = false;
    private delay: number = 0;

    constructor(delay?: number) {
        this.delay = delay || 0;
    }

    enqueue(asyncTask: () => Promise<T>): void {
        this.queue.push(asyncTask);

        if (!this.running)
            this.runNextTask();
    }

    private async runNextTask(): Promise<void> {
        if (this.queue.length > 0) {
            this.running = true;

            const task = this.queue.shift();

            if (task) {
                try {
                    await task();
                } catch (err) {
                    console.error(err);
                } finally {
                    if (this.delay !== 0)
                        await sleep(this.delay);

                    this.runNextTask();
                }
            }
        } else this.running = false;
    }
}