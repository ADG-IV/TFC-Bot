const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder().setName('pause').setDescription('Met en pause'),
    async execute(interaction) {
        await musicPlayer.pause(interaction);
    },
};