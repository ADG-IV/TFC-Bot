const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Débannir un utilisateur par son ID')
    .addStringOption(o => o.setName('id').setDescription('ID Discord').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison du débannissement').setRequired(false)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const userId = interaction.options.getString('id');
    const reason = interaction.options.getString('raison') ?? 'Aucune raison';

    try {
      await interaction.guild.bans.remove(userId, reason);
      await interaction.editReply({ content: `<@${userId}> a été débanni !\nRaison : ${reason}` });
    } catch (err) {
      await interaction.editReply({ content: 'Utilisateur non banni ou ID invalide.', flags: InteractionResponseFlags.Ephemeral });
    }
  },
};