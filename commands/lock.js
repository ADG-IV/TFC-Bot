const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Verrouille le salon (seuls les modos peuvent parler)')
    .addStringOption(o => o.setName('raison').setDescription('Raison du verrouillage').setRequired(false)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const reason = interaction.options.getString('raison') ?? 'Raison non précisée';
    await interaction.channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { SendMessages: false });

    await interaction.editReply({ content: `Salon verrouillé par ${interaction.user}\n**Raison :** ${reason}` });
  },
};