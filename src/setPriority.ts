export default function (priorityName: string) {
    if (!globalThis.process) return;
    const os = require('os');
    const { constants: { priority } } = os

    if (os.getPriority() === priority[priorityName])
        return true;

    try {
        os.setPriority(priority[priorityName]);
    } catch { return false; }
    finally { return true; }
};