import os from 'os';
const { constants: { priority } } = os

export default function (priorityName: keyof typeof priority) {
    if (os.getPriority() === priority[priorityName])
        return true;

    try {
        os.setPriority(priority[priorityName]);
    } catch { return false; }
    finally { return true; }
};