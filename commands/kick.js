const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Expulse un membre du serveur')
    .addUserOption(option =>
      option
        .setName('membre')
        .setDescription('Le membre à expulser')
        .setRequired(true))
    .addStringOption(option =>
      option
        .setName('raison')
        .setDescription('Raison du kick')
        .setRequired(false)),

  async execute(interaction) {
    // Vérif permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      return interaction.editReply({
        content: 'Tu n’as pas la permission d’expulser des membres.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const member = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison') ?? 'Aucune raison fournie';

    // Vérif que le bot peut kicker
    if (!member?.kickable) {
      return interaction.editReply({
        content: 'Je ne peux pas expulser cette personne (rôle plus haut ou propriétaire).',
        flags: InteractionResponseFlags.Ephemeral
      ;
      });
    }

    // Kick + réponse publique
    await member.kick(reason);
    await interaction.editReply({
      content: `**${member.user.tag}** a été expulsé du serveur !\n**Raison :** ${reason}`
    });
  },
};