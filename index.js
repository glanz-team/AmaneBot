const discord = require("discord.js");
const fs = require('fs');
const openjtalk = require('openjtalk');
require('discord-reply');
const mei = new openjtalk();
const client = new discord.Client();

var ttschannel = {};
client.on("ready", () => {
    console.log("logined");
});
client.on("message", async message => {
    if (message.content.startsWith("!tts-leave")) {
        channel = message.member.voice.channel;
        if (!channel) return message.lineReplyNoMention('エラーが発生しました。以下の原因が考えられます:\n・既に退出済みまたはTTSに接続していない\n権限がない(ボイスチャンネルに接続しているユーザーのみ実行可能です)');
        await channel.leave();
        await message.lineReplyNoMention('TTSから切断しました。');
        return;
    }
    if (message.content.startsWith("!tts-join")) {
        const args = message.content.split(" ").shift();
        const channel = message.member.voice.channel;
        if (!channel) return message.lineReplyNoMention("このコマンドはボイスチャンネルに居るユーザーのみ使用可能です。");
        const connection = await channel.join();
        ttschannel[message.guild.id] = {
            voiceChannel: message.member.voice.channel,
            txtChannel: message.channel.id,
            data: true
        };
        const dispatcher = connection.play(mei.talk("TTSに接続しました。"));
    }

    if (ttschannel[message.guild.id]["data"] && message.content.startsWith("!tts-leave")) {
        const ttsdata = ttschannel[message.guild.id];
        if (message.channel.id != ttsdata.txtChannel) return;
        const connection = await ttsdata.voiceChannel.join();
        const dispatcher = connection.play(mei.talk(message.author.username + "　　。" + message.content));
    }
});
client.login("ODIzMTIyMjkzMTg5OTAyMzM2.YFcOXw.4JN1uNGaFckgOPhD0wlF21SFXi4");