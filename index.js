// index.js – TFC Bot – Version finale 2025 (zéro warning, Render-ready)

require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  Routes,
  REST,
  InteractionResponseFlags,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const express = require("express");

console.log("Token chargé ?", !!process.env.DISCORD_TOKEN);

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

// Chargement des commandes
const commands = [];
const commandsPath = path.join(__dirname, "commands");
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"))) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Bot prêt
client.once("ready", async () => {
  console.log(`Bot en ligne : ${client.user.tag}`);

  // Déploiement des slash commands
  try {
    await new REST().setToken(process.env.DISCORD_TOKEN).put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log(`${commands.length} commandes déployées !`);
  } catch (e) { console.error(e); }

  // Statut pro
  client.user.setPresence({
    activities: [{ name: "/help | 7 commandes", type: 2 }], // 2 = Listening
    status: "online",
  });
});

// Interactions (anti-10062 + zéro warning)
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await interaction.deferReply();
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erreur ${interaction.commandName} :`, error);
    const msg = { content: "Une erreur est survenue.", flags: InteractionResponseFlags.Ephemeral };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(msg).catch(() => {});
    } else {
      await interaction.reply(msg).catch(() => {});
    }
  }
});

// Anti-warning Render "No open ports"
express().get("/", (req, res) => res.send("TFC Bot OK")).listen(process.env.PORT || 3000);

client.login(process.env.DISCORD_TOKEN);