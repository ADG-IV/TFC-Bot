const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('slowmode')
    .setDescription('Active le mode lent dans le salon')
    .addIntegerOption(o => o
      .setName('secondes')
      .setDescription('0 = désactiver, max 21600 (6h)')
      .setRequired(true)
      .setMinValue(0)
      .setMaxValue(21600)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const seconds = interaction.options.getInteger('secondes');
    await interaction.channel.setRateLimitPerUser(seconds);

    const text = seconds === 0 ? 'désactivé' : `activé sur **${seconds}s**`;
    await interaction.editReply({ content: `Mode lent ${text} dans ce salon.` });
  },
};