const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('stop').setDescription('Arrête la musique'),
    async execute(interaction) {
        await musicPlayer.stop(interaction);
    },
};