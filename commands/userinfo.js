const { SlashCommandBuilder, EmbedBuilder, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Affiche les infos détaillées d’un membre')
    .addUserOption(o => o.setName('membre').setDescription('Le membre (ou toi par défaut)')),

  async execute(interaction) {
    const member = interaction.options.getMember('membre') || interaction.member;
    const user = member.user;

    const embed = new EmbedBuilder()
      .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
      .setThumbnail(user.displayAvatarURL({ size: 256 }))
      .setColor(member.displayHexColor || '#2f3136')
      .addFields(
        { name: 'Membre', value: `${member}`, inline: true },
        { name: 'ID', value: `\`${user.id}\``, inline: true },
        { name: 'Compte créé', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: false },
        { name: 'Arrivée sur le serveur', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: false },
        { name: `Rôles (${member.roles.cache.size - 1})`, value: member.roles.cache.filter(r => r.id !== interaction.guild.id).map(r => r).join(' ') || 'Aucun', inline: false }
      )
      .setFooter({ text: `Demandé par ${interaction.user.tag}` })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};