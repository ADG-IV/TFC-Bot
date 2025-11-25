// commands/warn.js
const { SlashCommandBuilder } = require('discord.js');

const warns = new Map(); // temporaire, on passera en DB plus tard si tu veux

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Averti un membre')
        .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
        .addStringOption(o => o.setName('raison').setDescription('Raison').setRequired(true)),

    async execute(interaction) {
        const member = interaction.options.getMember('membre');
        const reason = interaction.options.getString('raison');
        const userId = member.user.id;

        const count = (warns.get(userId) || 0) + 1;
        warns.set(userId, count);

        await interaction.reply(`**${member.user.tag}** a reçu un warn (${count} au total).\nRaison : ${reason}`);
    },
};