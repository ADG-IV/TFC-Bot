const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Bannir un membre du serveur')
    .addUserOption(option =>
      option
        .setName('membre')
        .setDescription('Le membre à bannir')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('raison')
        .setDescription('Raison du ban')
        .setRequired(false)),

  async execute(interaction) {
    // Vérif permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
      return interaction.editReply({
        content: '❌ Tu n’as pas la permission de bannir des membres.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const member = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison') ?? 'Aucune raison fournie';

    // Vérif que le bot peut bannir
    if (!member.bannable) {
      return interaction.editReply({
        content: '❌ Je ne peux pas bannir cette personne (rôle plus haut ou même propriétaire).',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    // Ban + réponse publique
    await member.ban({ reason });
    await interaction.editReply({
      content: `**${member.user.tag}** a été banni du serveur !\n**Raison :** ${reason}`
    });
  },
};