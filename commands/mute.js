// commands/mute.js
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('mute')
        .setDescription('Mute un membre (timeout)')
        .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
        .addIntegerOption(o => o.setName('minutes').setDescription('Durée en minutes (max 40320 = 28 jours)').setRequired(true))
        .addStringOption(o => o.setName('raison').setDescription('Raison').setRequired(false)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            return interaction.reply({ content: 'Tu n’as pas la permission.', ephemeral: true });
        }

        const member = interaction.options.getMember('membre');
        const minutes = interaction.options.getInteger('minutes');
        const reason = interaction.options.getString('raison') ?? 'Pas de raison';

        if (minutes > 40320) return interaction.reply({ content: 'Max 28 jours (40320 minutes)', ephemeral: true });

        await member.timeout(minutes * 60 * 1000, reason);
        await interaction.reply(`${member.user.tag} muté pendant ${minutes} minute(s).`);
    },
};