const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Affiche toutes les commandes'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Commandes TFC Bot')
            .setDescription('`/ping` → test\n`/kick` → expulser un membre')
            .setColor('#00ff00');
        await interaction.reply({ embeds: [embed] });
    },
};