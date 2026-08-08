const { Client, GatewayIntentBits  } = require("discord.js");
const { WebSocketServer } = require('ws');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ]
});

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

  const data = JSON.stringify({
    type: "message",
    author: message.author.username,
    content: message.content
  });

  for (const socket of wss.clients) {
    if (socket.readyState === 1) {
        socket.send(data);
    }
  }

  message.react("✅");
});

const port = process.env.PORT || 3000;

const wss = new WebSocketServer({
    port
});

wss.on("connection", (socket) => {
    console.log("BDS connected");

    socket.on("message", (data) => {
        console.log("Minecraft → Discord:", data.toString());
    });

    socket.on("close", () => {
        console.log("BDS disconnected");
    });
});
