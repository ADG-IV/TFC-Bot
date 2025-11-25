// commands/play.js
const { SlashCommandBuilder } = require('discord.js');
const musicPlayer = require('../musicPlayer.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play')
        .setDescription('Joue une musique (YouTube, Spotify, lien direct)')
        .addStringOption(option =>
            option.setName('musique')
                .setDescription('Nom de la musique ou lien YouTube')
                .setRequired(true)),
    async execute(interaction) {
        await interaction.deferReply();
        const query = interaction.options.getString('musique');
        await musicPlayer.play(interaction, query);
    },
};