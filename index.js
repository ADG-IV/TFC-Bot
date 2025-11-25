// ═══════════════════════════════════════════════════════════════
//  TFC Bot – index.js – Version définitive, propre et anti-crash
// ═══════════════════════════════════════════════════════════════

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

// ────── DEBUG TOKEN (à garder 2 jours, tu pourras virer après) ──────
console.log("Token chargé ?", !!process.env.DISCORD_TOKEN);
if (process.env.DISCORD_TOKEN) {
  console.log("Token commence par :", process.env.DISCORD_TOKEN.slice(0, 15) + "...");
}

// ────── Client avec tous les intents nécessaires à la modération ──────
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

// ────── Chargement automatique de toutes les commandes ──────
const commands = [];
const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"))) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  commands.push(command.data.toJSON());
}

// ────── Bot prêt → déploiement global des slash commands ──────
client.once("ready", async () => {
  console.log(`Bot en ligne → ${client.user.tag}`);

  try {
    console.log("Déploiement des slash commands...");
    await new REST()
      .setToken(process.env.DISCORD_TOKEN)
      .put(Routes.applicationCommands(client.user.id), { body: commands });
    console.log(`7 commandes déployées avec succès !`);
  } catch (err) {
    console.error("Erreur déploiement :", err);
  }
});

// ────── Gestion des interactions – 100% anti 10062 (Unknown interaction) ──────
client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    // On defer TOUJOURS en premier → plus jamais de timeout
    await interaction.deferReply();

    // Exécution de la commande
    await command.execute(interaction);
  } catch (error) {
    console.error(`Erreur commande ${interaction.commandName} :`, error);
    const msg = { content: "Une erreur est survenue.", ephemeral: true };

    if (interaction.deferred || interaction.replied) {
      await interaction.editReply(msg).catch(() => {});
    } else {
      await interaction.reply(msg).catch(() => {});
    }
  }
});

// ────── Empêche Render de tuer le bot (warning "No open ports") ──────
const express = require("express");
const app = express();
app.get("/", (req, res) => res.send("TFC Bot est en vie !"));
app.listen(process.env.PORT || 3000);

// ────── Connexion ──────
client.login(process.env.DISCORD_TOKEN).catch(err => {
  console.error("Impossible de se connecter – token invalide ?", err);
});