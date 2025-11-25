// deploy-commands.js
require('dotenv').config();
const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

const commands = [];
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Déploiement des slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID), // commandes globales
            { body: commands }
        );
        console.log('✅ Slash commands déployées avec succès !');
    } catch (error) {
        console.error(error);
    }
})();