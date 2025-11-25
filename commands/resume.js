const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('resume').setDescription('Reprend la musique'),
    async execute(interaction) {
        await musicPlayer.resume(interaction);
    },
};