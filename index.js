const discord = require("discord.js");
const fs = require('fs');
const openjtalk = require('openjtalk');
require('discord-reply');
const mei = new openjtalk();
const client = new discord.Client();

var ttschannel={}
client.on("ready",()=>{
    console.log("logined");
});
client.login("");