const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('role')
    .setDescription('Ajouter ou retirer un rôle')
    .addSubcommand(s => s
      .setName('add')
      .setDescription('Ajouter un rôle')
      .addUserOption(o => o.setName('membre').setRequired(true).setDescription('Le membre'))
      .addRoleOption(o => o.setName('rôle').setRequired(true).setDescription('Le rôle')))
    .addSubcommand(s => s
      .setName('remove')
      .setDescription('Retirer un rôle')
      .addUserOption(o => o.setName('membre').setRequired(true).setDescription('Le membre'))
      .addRoleOption(o => o.setName('rôle').setRequired(true).setDescription('Le rôle'))),

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) {
      return interaction.editReply({ content: 'Tu n’as pas la permission.', flags: InteractionResponseFlags.Ephemeral });
    }

    const member = interaction.options.getMember('membre');
    const role = interaction.options.getRole('rôle');
    const isAdd = interaction.options.getSubcommand() === 'add';

    if (!member || !role) {
      return interaction.editReply({ content: 'Membre ou rôle introuvable.', flags: InteractionResponseFlags.Ephemeral });
    }

    if (isAdd) {
      await member.roles.add(role);
      await interaction.editReply({ content: `Rôle ${role} ajouté à ${member}.` });
    } else {
      await member.roles.remove(role);
      await interaction.editReply({ content: `Rôle ${role} retiré de ${member}.` });
    }
  },
};