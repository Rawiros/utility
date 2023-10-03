type guildId = string | number | bigint;
type channelId = string | number | bigint;
type messageId = string | number | bigint;
type userId = string | number | bigint;

export interface DirectURLArgs {
    guild: [guildId]
    channel: [guildId, channelId]
    user: [userId]
    message: [guildId, channelId, messageId]
}

export default function <Type extends keyof DirectURLArgs>(type: Type, args: DirectURLArgs[Type]) {
    if (type === "user")
        return `https://discord.com/users/${args[0]}`;

    if (type === "channel")
        return `https://discord.com/channels/${args[0]}/${args[1]}`;

    if (type === "guild")
        return `https://discord.com/channels/${args[0]}`;

    if (type === "message")
        return `https://discord.com/channels/${args[0]}/${args[1]}/${args[2]}`

    return "";
};