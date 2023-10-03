// @ts-nocheck
import getUsername from "./getUsername";

type guildId = string | number | bigint;
type channelId = string | number | bigint;
type messageId = string | number | bigint;
type userId = string | number | bigint;

export interface DirectURLArgs {
    guild: [{ id: guildId, name: string }]
    channel: [{ id: guildId, name: string }, { name?: string, id: channelId }]
    user: [{ globalName?: string, username: string, id: userId }]
    message: [{ id: guildId, name: string }, { name?: string, id: channelId }, { id: messageId, author: { globalName?: string, username: string, id: userId } }]
}

export default function <Type extends keyof DirectURLArgs>(type: Type, args: DirectURLArgs[Type]) {
    if (type === "user")
        return `[${getUsername(args[0])}](https://discord.com/users/${args[0].id})`;

    if (type === "channel")
        return `[${args[1]?.name || "Unknown"}](https://discord.com/channels/${args[0].id}/${args[1]?.id})`;

    if (type === "guild")
        return `[${args[0]?.name || "Unknown"}](https://discord.com/channels/${args[0].id})`;

    if (type === "message")
        return `[${args[2]?.author ? getUsername(args[2].author) + "'s" : "Message URL"}](https://discord.com/channels/${args[0].id}/${args[1].id}/${args[2].id})`

    return "";
};