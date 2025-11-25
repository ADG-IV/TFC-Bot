// index.js – TFC Bot – Version finale 100% stable (2025)

require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  Collection,
  Routes,
  REST,
} = require("discord.js");
const fs = require("fs");
const path = require("path");
const express = require("express");

// Debug token (à virer dans 2 jours si tu veux)
console.log("Token chargé ?", !!process.env.DISCORD_TOKEN);
if (process.env.DISCORD_TOKEN) {
  console.log("Token commence par :", process.env.DISCORD_TOKEN.slice(0, 15) + "...");
}

// Client avec les bons intents pour tes commandes
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

// Chargement automatique de toutes les commandes du dossier /commands
const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// Bot prêt → déploiement des slash commands
client.once("ready", async () => {
  console.log(`Bot en ligne : ${client.user.tag}`);

  try {
    const rest = new REST().setToken(process.env.DISCORD_TOKEN);
    await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log(`${commands.length} commandes déployées avec succès !`);
  } catch (error) {
    console.error("Erreur déploiement :", error);
  }
});

// Gestion des interactions – ANTI-10062 + anti-crash
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await interaction.deferReply(); // Ligne magique qui tue l'erreur 10062
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erreur dans /${interaction.commandName} :`, error);
    const msg = { content: "Une erreur est survenue.", ephemeral: true };
    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(msg).catch(() => {});
    } else {
      await interaction.reply(msg).catch(() => {});
    }
  }
});

// Petit serveur Express → plus de warning "No open ports" sur Render
const app = express();
app.get("/", (req, res) => res.send("TFC Bot est en vie !"));
app.listen(process.env.PORT || 3000, () => console.log("Serveur HTTP OK"));

// ────── Statut dynamique du bot ──────
client.once("ready", () => {
  console.log(`Bot en ligne : ${client.user.tag}`);

  // Statut + activité "/help"
  client.user.setActivity("/help", { type: 2 }); // 2 = LISTENING
  client.user.setStatus("online");

  // Optionnel : texte en dessous du nom (uniquement sur le profil du bot)
  client.user.setPresence({
    activities: [{
      name: "/help | 7 commandes",
      type: 2 // Listening
    }],
    status: "online"
  });
});

// Connexion du bot
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error("Token invalide ou manquant !", err);
  process.exit(1);
});