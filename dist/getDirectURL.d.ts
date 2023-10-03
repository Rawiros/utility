type guildId = string | number | bigint;
type channelId = string | number | bigint;
type messageId = string | number | bigint;
type userId = string | number | bigint;
export interface DirectURLArgs {
    guild: [guildId];
    channel: [guildId, channelId];
    user: [userId];
    message: [guildId, channelId, messageId];
}
export default function <Type extends keyof DirectURLArgs>(type: Type, args: DirectURLArgs[Type]): string;
export {};
