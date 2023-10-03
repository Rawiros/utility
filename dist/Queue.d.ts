export default class Queue<T> {
    private queue;
    private running;
    private delay;
    constructor(delay?: number);
    enqueue(asyncTask: () => Promise<T>): void;
    private runNextTask;
}
