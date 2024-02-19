import { icons as _icons, placeholder } from './icons.json';
import getCustomId from './getCustomId';
import time2ms from './time2ms';
import flattenObject from './flattenObject';
import SetDB from './SetDB';
import MapDB from './MapDB';
import setPriority from './setPriority';
import formatErrorStack from './formatErrorStack';
import formatBytes from './formatBytes';
import getDirectURL from './getDirectURL';
import getUsername from './getUsername';
import getFormattedDirectURL from './getFormattedDirectURL';
import Queue from './Queue';
import YAMLConfig from './YAMLConfig';

_icons.Placeholder = _icons[placeholder as keyof typeof _icons];

// @ts-ignore
if (!globalThis?.DOT) {
    const EMPTY = "᲼";
    const DOT = "•";

    Object.defineProperties(globalThis, {
        EMPTY: { get() { return EMPTY } },
        DOT: { get() { return DOT } }
    });

}

declare global {
    const DOT: string
    const EMPTY: string

    interface Boolean {
        is(value: Boolean): boolean
        toIcon(): string
    }
    interface String {
        firstToUpperCase(): string
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
        format(digits?: number): string
        formatBytes(decimals?: number): string
        limit(min?: number, max?: number): number
    }
    interface Math {
        toByte(degress: number): number
        limit(value: number, min?: number, max?: number): number
    }
    interface Array<T> {
        random(): T;
    }
};

Math.toByte = degrees => {
    let b = Math.floor((degrees % 360) * 256 / 360)
    if (b < -128) b += 256
    else if (b > 127) b -= 256
    return b;
};

Math.limit = (value: number, min = 0, max = 128) => Math.min(Math.max(value, min), max);

Array.prototype.random = function () {
    return this[Math.floor(Math.random() * this.length)];
}

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
const rule = /\.0+$|(.\d*[1-9])0+$/;
const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" }
];

Number.prototype.format = function (digits = 2) {
    const value = this.valueOf();
    const item = lookup.slice().reverse().find(item => value >= item.value);

    return item ? (value / item.value).toFixed(digits).replace(rule, "$1") + item.symbol : "0";
}

Number.prototype.equals = function (value) {
    return this.valueOf() === value;
};

Number.prototype.formatBytes = function (decimals = undefined) {
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

Number.prototype.limit = function (min = 0, max = 128) {
    return Math.min(Math.max(this.valueOf(), min), max)
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

String.prototype.firstToUpperCase = function () {
    return (this as string).split("_").map(e => e[0].toUpperCase() + e.slice(1).toLowerCase()).join("");
};

const Icon = <IconName extends keyof typeof _icons>(name: IconName, text?: string) => {
    if (!text)
        return _icons[name];

    return `${_icons[name]} ${text}`;
};

const Icons = { ..._icons, Icon };

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const joinString = (...lines: string[]) => lines.filter(line => !!line).join("\n");

function recache(id: string) {
    if (!process) return;
    try {
        const realpath = require.resolve(id);

        delete require.cache[realpath];
        return require.cache[realpath] = require(realpath);
    } catch (err) {
        console.error(err);
        return false;
    }
}

// expose global garbage collector
if (globalThis.process) {
    if (globalThis.process.argv0 !== "bun" && !globalThis.gc) {
        require("v8").setFlagsFromString('--expose_gc');
        globalThis.gc = require("vm").runInNewContext('gc');
    }
    // listen for errors
    // if (process.env.PM2_HOME) {
    //     process.on('uncaughtException', (err, origin) => console.log(origin, err));
    //     process.on('unhandledRejection', err => console.log("unhandledRejection", err));
    // };
};

// type LoadFunction<T> = (key: string) => T;
// type UnloadFunction<T> = (key: string) => void;

//function make_weak_cache<T extends WeakKey>(load: LoadFunction<T>, unload?: UnloadFunction<T>) {
//    const cache = new Map<string, WeakRef<T>>();
//
//    const cleanup = new FinalizationRegistry((key: string) => {
//        const ref = cache.get(key);
//
//        if (ref && !ref.deref()) {
//            if (cache.delete(key) && unload) {
//                unload(key);
//            }
//        }
//    });
//
//    return (key: string) => {
//        const ref = cache.get(key);
//
//        if (ref) {
//            const cached = ref.deref();
//
//            if (cached !== undefined) {
//                return cached;
//            }
//        }
//
//        const fresh = load(key);
//        cache.set(key, new WeakRef(fresh));
//        cleanup.register(fresh, key);
//
//        return fresh;
//    };
//}

function make_weak_cached(load: any, unload: any) {
    const cache = new Map()
    const cleanup = new FinalizationRegistry(key => {
        const ref = cache.get(key)
        if (ref && !ref.deref()) {
            if (cache.delete(key)) unload(key)
        }
    })
    return (key: any) => {
        const ref = cache.get(key)
        if (ref) {
            const cached = ref.deref()
            if (cached !== undefined) return cached
        }
        const fresh = load(key)
        cache.set(key, new WeakRef(fresh))
        cleanup.register(fresh, key)
        return fresh
    }
}

// class WeakCached<K extends any, V extends any> extends Map<K, any> {
//     constructor(o: {
//         load(key: K): V;
//         unload(key: K): any;
//     }) {
//         super();

//         const cleanup = new FinalizationRegistry((key: any) => {
//             const ref = super.get(key);

//             if (ref && !ref?.deref())
//                 if (super.delete(key))
//                     o.unload(key);
//         });

//         Object.defineProperty(this, 'get', {
//             value: (key: any) => {
//                 const ref = super.get(key);

//                 if (ref) {
//                     const cached = ref.deref();

//                     if (cached !== void 0)
//                         return cached;
//                 };

//                 const fresh = o.load(key)
//                 super.set(key, new WeakRef(fresh));
//                 cleanup.register(fresh, key);

//                 return fresh;
//             }
//         })
//     };

//     get: ((key: K) => V) = () => void 0 as V;

//     /**
//      * Not Implemented
//      */
//     set(): this {
//         throw new Error("Not Implemented");
//     }
// }


/**
 * @param condition Condition that needs to be meet
 * @param ms Condition check interval
 * @returns {Promise<unknown>}
 */
const until = (condition: () => boolean, ms: number = 750) => new Promise(resolve => {
    let interval: NodeJS.Timeout;

    function performACheck() {
        const state = condition();

        if (!state)
            return;

        clearInterval(interval);
        resolve(void 0);
    };


    performACheck();
    interval = setInterval(performACheck, ms);
});


export { Icons, getCustomId, until, YAMLConfig, make_weak_cached, time2ms, sleep, formatBytes, Queue, getUsername, recache, getFormattedDirectURL, getDirectURL, flattenObject, joinString, MapDB, SetDB, setPriority, formatErrorStack, Icon, DOT, EMPTY };
