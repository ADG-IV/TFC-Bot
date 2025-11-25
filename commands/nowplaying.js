const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('nowplaying').setDescription('Musique en cours'),
    async execute(interaction) {
        await musicPlayer.nowplaying(interaction);
    },
};