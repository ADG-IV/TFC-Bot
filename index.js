// index.js – Version finale anti-crash 100% (2025)
require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
} = require("discord.js");
const fs = require("fs");
const path = require("path");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildModeration,
  ],
});

client.commands = new Collection();

// Chargement automatique des commandes
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Bot prêt → déploiement des slash
client.once("ready", async () => {
  console.log(`Bot en ligne : ${client.user.tag}`);

  try {
    await new REST().setToken(process.env.DISCORD_TOKEN).put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log(`${commands.length} commandes déployées`);
  } catch (e) { console.error(e); }
});

// GESTION DES COMMANDES – VERSION AN