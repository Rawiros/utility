type guildId = string | number | bigint;
type channelId = string | number | bigint;
type messageId = string | number | bigint;
type userId = string | number | bigint;
export interface DirectURLArgs {
    guild: [{
        id: guildId;
        name: string;
    }];
    channel: [{
        id: guildId;
    }, {
        name?: string;
        id: channelId;
    }];
    user: [{
        globalName?: string;
        username: string;
        id: userId;
    }];
    message: [{
        id: guildId;
    }, {
        id: channelId;
    }, {
        id: messageId;
        author: {
            globalName?: string;
            username: string;
            id: userId;
        };
    }];
}
export default function <Type extends keyof DirectURLArgs>(type: Type, args: DirectURLArgs[Type]): string;
export {};
