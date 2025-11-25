const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('skip').setDescription('Passe la musique'),
    async execute(interaction) {
        await musicPlayer.skip(interaction);
    },
};