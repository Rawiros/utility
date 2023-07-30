import getCustomId from './getCustomId';
import time2ms from './time2ms';
import flattenObject from './flattenObject';
import SetDB from './SetDB';
import setPriority from './setPriority';
import formatErrorStack from './formatErrorStack';
declare const EMPTY = "\u1CBC";
declare const DOT = "\u2022";
declare global {
    const DOT: string;
    const EMPTY: string;
    interface Boolean {
        is(value: Boolean): boolean;
        toIcon(): string;
    }
    interface String {
        firstUpper(): String;
        limit(length: number): String;
        equals(value: string): boolean;
        format(data?: Record<string, any>): String;
    }
    interface BigInt {
        toNumber(): number;
        equals(value: bigint): boolean;
    }
    interface Number {
        toBigInt(): bigint;
        equals(value: number): boolean;
    }
}
declare const Icon: <IconName extends "Danger1" | "Minus" | "No" | "Yes" | "Hammer" | "Time" | "Todo" | "Hmm" | "Date" | "Danger3" | "Heart" | "Id" | "Info" | "Join" | "Leave" | "Message" | "Pin" | "Stage" | "Telegram" | "User" | "Crown" | "Airplane" | "Bank" | "Bell" | "Bulb" | "Forum" | "Invite" | "Key" | "Lock" | "Moon" | "Options" | "Pen" | "Plus" | "Star2" | "Star3" | "Stars" | "Thunder" | "Trophy" | "Unluck" | "User1" | "Users" | "Mention" | "Fire" | "Link" | "Placeholder">(name: IconName, text?: string) => string;
declare const Icons: {
    Icon: <IconName extends "Danger1" | "Minus" | "No" | "Yes" | "Hammer" | "Time" | "Todo" | "Hmm" | "Date" | "Danger3" | "Heart" | "Id" | "Info" | "Join" | "Leave" | "Message" | "Pin" | "Stage" | "Telegram" | "User" | "Crown" | "Airplane" | "Bank" | "Bell" | "Bulb" | "Forum" | "Invite" | "Key" | "Lock" | "Moon" | "Options" | "Pen" | "Plus" | "Star2" | "Star3" | "Stars" | "Thunder" | "Trophy" | "Unluck" | "User1" | "Users" | "Mention" | "Fire" | "Link" | "Placeholder">(name: IconName, text?: string) => string;
    Minus: string;
    No: string;
    Yes: string;
    Hammer: string;
    Time: string;
    Todo: string;
    Hmm: string;
    Date: string;
    Danger1: string;
    Danger3: string;
    Heart: string;
    Id: string;
    Info: string;
    Join: string;
    Leave: string;
    Message: string;
    Pin: string;
    Stage: string;
    Telegram: string;
    User: string;
    Crown: string;
    Airplane: string;
    Bank: string;
    Bell: string;
    Bulb: string;
    Forum: string;
    Invite: string;
    Key: string;
    Lock: string;
    Moon: string;
    Options: string;
    Pen: string;
    Plus: string;
    Star2: string;
    Star3: string;
    Stars: string;
    Thunder: string;
    Trophy: string;
    Unluck: string;
    User1: string;
    Users: string;
    Mention: string;
    Fire: string;
    Link: string;
    Placeholder: string;
};
declare const sleep: (ms: number) => Promise<unknown>;
declare const joinString: (...lines: string[]) => string;
export { Icons, getCustomId, time2ms, sleep, flattenObject, joinString, SetDB, setPriority, formatErrorStack, Icon, DOT, EMPTY };
