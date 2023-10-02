import { icons as _icons, placeholder } from './icons.json';
import getCustomId from './getCustomId';
import time2ms from './time2ms';
import flattenObject from './flattenObject';
import SetDB from './SetDB';
import MapDB from './MapDB';
import setPriority from './setPriority';
import formatErrorStack from './formatErrorStack';
import formatBytes from './formatBytes';

_icons.Placeholder = _icons[placeholder as keyof typeof _icons];

const EMPTY = "᲼"
const DOT = "•"

Object.defineProperties(global, {
    EMPTY: { get() { return EMPTY } },
    DOT: { get() { return DOT } },
});

declare global {
    const DOT: string
    const EMPTY: string

    interface Boolean {
        is(value: Boolean): boolean
        toIcon(): string
    }
    interface String {
        firstUpper(): string
        limit(length: number): string
        equals(value: string): boolean
        format(data?: Record<string, any>): string
    }
    interface BigInt {
        toNumber(): number
        is(value: bigint): boolean
        addFlag(flag: bigint): bigint
        hasFlag(flag: bigint): boolean
        removeFlag(flag: bigint): bigint
    }
    interface Number {
        toBigInt(): bigint
        equals(value: number): boolean
        addFlag(flag: number): number
        hasFlag(flag: number): boolean
        removeFlag(flag: number): number
        formatBytes(decimals?: number): string
    }
    interface Math {
        toByte(degress: number): number
        limit(value: number, min?: number, max?: number): number
    }
};

Math.toByte = degrees => {
    let b = Math.floor((degrees % 360) * 256 / 360)
    if (b < -128) b += 256
    else if (b > 127) b -= 256
    return b;
};

Math.limit = (value: number, min = 0, max = 128) => Math.min(Math.max(value, min), max);

String.prototype.equals = function (value) {
    return this === value;
};

String.prototype.format = function (data = {}) {
    let text = String(this);

    for (const key of Object.keys(data))
        text = text.replaceAll(`{${key}}`, data[key]);

    return text;
};

String.prototype.limit = function (length = 1970) {
    if (this.length >= length)
        return this.slice(0, length - 3).concat("...")

    return this as string;
};

Boolean.prototype.is = function (value) {
    return this.valueOf() === value;
};

// Numbers
Number.prototype.equals = function (value) {
    return this.valueOf() === value;
};

Number.prototype.formatBytes = function(decimals = undefined) {
    return formatBytes(this.valueOf(), decimals)
}

Number.prototype.addFlag = function (flag) {
    return this.valueOf() | (1 << flag);
};

Number.prototype.hasFlag = function (flag) {
    return (this.valueOf() & (1 << flag)) !== 0;
};

Number.prototype.removeFlag = function (flag) {
    return Math.max(this.valueOf() & ~(1 << flag), 0)
};

// BigInts
BigInt.prototype.addFlag = function (flag) {
    return this.valueOf() | (1n << flag);
};

BigInt.prototype.hasFlag = function (flag) {
    return (this.valueOf() & (1n << flag)) !== 0n;
};

BigInt.prototype.removeFlag = function (flag) {
    return this.valueOf() < 0n ? 0n : this.valueOf() & ~(1n << flag);
};;

BigInt.prototype.is = function (value) {
    return this === value.valueOf();
};

BigInt.prototype.toNumber = function () {
    return Number(this.valueOf());
};

Boolean.prototype.toIcon = function () {
    return this ? _icons.Yes : _icons.No;
};

String.prototype.firstUpper = function () {
    return (this as string).split("_").map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join("");
};

if (process.argv0 !== "bun" && !globalThis.gc) {
    require("v8").setFlagsFromString('--expose_gc');
    global.gc = require("vm").runInNewContext('gc');
}

const Icon = <IconName extends keyof typeof _icons>(name: IconName, text?: string) => {
    if (!text)
        return _icons[name];

    return `${_icons[name]} ${text}`;
}

const Icons = { ..._icons, Icon };

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const joinString = (...lines: string[]) => lines.filter(line => !!line).join("\n");

export { Icons, getCustomId, time2ms, sleep, formatBytes, flattenObject, joinString, MapDB, SetDB, setPriority, formatErrorStack, Icon, DOT, EMPTY };