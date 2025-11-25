const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute un membre (timeout)')
    .addUserOption(o => o
      .setName('membre')
      .setDescription('Le membre à muter')
      .setRequired(true))
    .addIntegerOption(o => o
      .setName('minutes')
      .setDescription('Durée en minutes (max 40320 = 28 jours)')
      .setRequired(true)
      .setMinValue(1)
      .setMaxValue(40320))
    .addStringOption(o => o
      .setName('raison')
      .setDescription('Raison du mute')
      .setRequired(false)),

  async execute(interaction) {
    // Vérif permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.editReply({
        content: 'Tu n’as pas la permission de muter des membres.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const member = interaction.options.getMember('membre');
    const minutes = interaction.options.getInteger('minutes');
    const reason = interaction.options.getString('raison') ?? 'Aucune raison fournie';

    // Vérif que le bot peut muter
    if (!member?.moderatable) {
      return interaction.editReply({
        content: 'Je ne peux pas muter cette personne (rôle plus haut ou propriétaire).',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    // Application du timeout
    await member.timeout(minutes * 60 * 1000, reason);

    // Réponse publique
    await interaction.editReply({
      content: `**${member.user.tag}** a été muté pendant **${minutes}** minute${minutes > 1 ? 's' : ''}.\n**Raison :** ${reason}`
    });
  },
};