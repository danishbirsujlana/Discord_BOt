const fetch = require('cross-fetch');
require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(process.env.Discord_Bot_Token);

const PREFIX = 'd--';

client.on('ready', () => {
    console.log(`${client.user.tag} has logged in.`);
})

client.on('message', (message) => {
    if(message.author.bot) {
        return;
    }

    // General messages.
    if(message.content === 'dBot is always correct') {
        message.reply('Yes, ture');
    }
    
    // Command messages.
    if(message.content.startsWith(PREFIX)) {
        const [CMD_Name, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);  // seperating command name and arguments.
        
        // console.log(CMD_Name);
        // console.log(args);

        const rate = Math.floor(Math.random() * 100) + 1;
        if(CMD_Name === 'hello') {
            message.reply('What up, biatch?');
        }
        if(CMD_Name === 'simpRate') {
            message.reply(`Your simp rate is ${rate}%`);
        }
        if(CMD_Name === 'dankRate') {
            message.reply(`Your dank rate is ${rate}%`);
        }
        if(CMD_Name === 'dadJoke') {
            const getDadJoke = async () => {
                const res = await fetch('https://icanhazdadjoke.com/slack')
                const data = await res.json();
                const joke = data.attachments[0].fallback;
                message.reply(joke);
            }
            getDadJoke();
        }
    }
})