import v8 from 'v8';
import vm from 'vm';
import { icons as _icons, placeholder } from './icons.json';
import getCustomId from './getCustomId';
import time2ms from './time2ms';
import flattenObject from './flattenObject';
import SetDB from './SetDB';

_icons.Placeholder = _icons[placeholder as keyof typeof _icons];

const EMPTY = "᲼"
const DOT = "•"

Object.assign(globalThis, { EMPTY, DOT })

declare global {
    const DOT: string
    const EMPTY: string

    interface Boolean {
        is(value: Boolean): boolean
        toIcon(): string
    }
    interface String {
        firstUpper(): String
        limit(length: number): String
        equals(value: string): boolean
        format(data?: Record<string, any>): String
    }
    interface BigInt {
        toNumber(): number
        equals(value: bigint): boolean
    }
    interface Number {
        toBigInt(): bigint
        equals(value: number): boolean
    }
};

String.prototype.equals = function (value) {
    return this === value;
};

String.prototype.format = function (data = {}) {
    let text = String(this);

    for (const key of Object.keys(data))
        text = text.replace(`{${key}}`, data[key]);

    return text;
};

String.prototype.limit = function (length = 1970) {
    if (this.length >= length)
        return this.slice(0, length - 3).concat("...")

    return this;
}

Number.prototype.equals = function (value) {
    return this === value;
};

Boolean.prototype.is = function (value) {
    return this === value;
};

Number.prototype.toBigInt = function () {
    return BigInt(this.valueOf());
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

if (!globalThis.gc) {
    v8.setFlagsFromString('--expose_gc');
    global.gc = vm.runInNewContext('gc');
}

const Icons = {
    ..._icons,
    Icon: <IconName extends keyof typeof _icons>(name: IconName, text?: string) => {
        if (!text)
            return _icons[name];

        return `${_icons[name]} ${text}`;
    }
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const joinString = (...lines: string[]) => lines.filter(line => !!line).join("\n");

export { Icons, getCustomId, time2ms, sleep, flattenObject, joinString, SetDB }; 