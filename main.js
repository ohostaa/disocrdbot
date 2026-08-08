const { Client } = require("discord.js");
const { AntiCrash } = require('discord-tool');
const axios = require('ws');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ]
});

new AntiCrash(client);

client.login(process.env.CLIENT_TOKEN);

//
const CHANNEL_ID = "1480053591611019264";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.channel.id !== CHANNEL_ID) return;

  // message length restriction
  if (message.content.length > 200) {
    try {
        message.react("❌");
    } catch (error) {
        console.error("Error reaction messages:", error);
    }
    return;
  }

  
});
