const { 
  SlashCommandBuilder, 
  PermissionsBitField, 
  InteractionResponseFlags 
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Supprime un nombre de messages dans le salon')
    .addIntegerOption(option =>
      option
        .setName('nombre')
        .setDescription('Nombre de messages à supprimer (1 à 99)')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(99)
    ),

  async execute(interaction) {
    // Vérification permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.editReply({
        content: 'Tu n’as pas la permission de gérer les messages.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const amount = interaction.options.getInteger('nombre') + 1; // +1 car la commande elle-même compte

    // Discord limite bulkDelete à 100 messages max et refuse les messages > 14 jours
    await interaction.channel.bulkDelete(amount, true).catch(() => {});

    // Confirmation éphémère
    await interaction.editReply({
      content: `Supprimé ${amount - 1} message${amount - 1 > 1 ? 's' : ''} !`,
      flags: InteractionResponseFlags.Ephemeral
    });
  },
};