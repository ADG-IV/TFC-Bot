// commands/clear.js
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Supprime un nombre de messages')
        .addIntegerOption(option =>
            option.setName('nombre')
                .setDescription('Nombre de messages à supprimer (1-99)')
                .setRequired(true)
                .setMinValue(1)
                .setMaxValue(99)),

    async execute(interaction) {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            return interaction.reply({ content: 'Tu n’as pas la permission.', ephemeral: true });
        }

        const amount = interaction.options.getInteger('nombre');
        await interaction.channel.bulkDelete(amount, true);
        await interaction.reply({ content: `${amount} messages supprimés !`, ephemeral: true });
    },
};