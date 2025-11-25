const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('queue').setDescription('Affiche la file'),
    async execute(interaction) {
        await musicPlayer.queue(interaction);
    },
};