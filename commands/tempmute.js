const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');
const ms = require('ms'); // → npm install ms

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tempmute')
    .setDescription('Mute temporaire (ex: 1h, 3d, 1w)')
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true))
    .addStringOption(o => o.setName('durée').setDescription('Ex: 30m, 2h, 7d').setRequired(true))
    .addStringOption(o => o.setName('raison').setDescription('Raison').setRequired(false)),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const member = interaction.options.getMember('membre');
    const duration = interaction.options.getString('durée');
    const reason = interaction.options.getString('raison') ?? 'Aucune raison';

    const time = ms(duration);
    if (!time || time > 2419200000) { // 28 jours max
      return interaction.editReply({ content: 'Durée invalide ou trop longue (max 28 jours).', flags: InteractionResponseFlags.Ephemeral });
    }

    if (!member?.moderatable) {
      return interaction.editReply({ content: 'Je ne peux pas muter cette personne.', flags: InteractionResponseFlags.Ephemeral });
    }

    await member.timeout(time, reason);
    await interaction.editReply({ content: `${member} muté pendant **${duration}**.\nRaison : ${reason}` });
  },
};