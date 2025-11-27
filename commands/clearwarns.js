const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');
const warns = require('./warns').warns || new Map(); // on réutilise le même Map

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarns')
    .setDescription('Supprime tous les avertissements d’un membre')
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const member = interaction.options.getMember('membre') || interaction.options.getUser('membre');
    const count = warns.get(member.id)?.length || 0;
    warns.delete(member.id);

    await interaction.editReply({
      content: count === 0 
        ? `${member} n’avait aucun avertissement.` 
        : `Tous les avertissements de ${member} ont été supprimés (${count} au total).`
    });
  },
};