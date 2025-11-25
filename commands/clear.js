const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

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
        .setMaxValue(99)),

  async execute(interaction) {
    // Vérification permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return interaction.editReply({
        content: 'Tu n’as pas la permission de gérer les messages.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const amount = interaction.options.getInteger('nombre');

    // Suppression des messages
    await interaction.channel.bulkDelete(amount, true);

    // Confirmation éphémère (visible seulement par l’auteur)
    await interaction.editReply({
      content: `${amount} message${amount > 1 ? 's' : ''} supprimé${amount > 1 ? 's' : ''} avec succès !`,
      flags: InteractionResponseFlags.Ephemeral
    });
  },
};