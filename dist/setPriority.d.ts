/// <reference types="node" />
import os from 'os';
declare const priority: typeof os.constants.priority;
export default function (priorityName: keyof typeof priority): boolean;
export {};
