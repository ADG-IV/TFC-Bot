const { SlashCommandBuilder, EmbedBuilder, InteractionResponseFlags } = require('discord.js');

const warns = new Map(); // userId → [{ mod: id, reason: string, date: timestamp }]

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warns')
    .setDescription('Affiche les avertissements d’un membre')
    .addUserOption(o => o.setName('membre').setDescription('Le membre').setRequired(true)),

  async execute(interaction) {
    const member = interaction.options.getMember('membre') || interaction.options.getUser('membre');
    const list = warns.get(member.id) || [];

    const embed = new EmbedBuilder()
      .setTitle(`Avertissements de ${member.displayName || member.username}`)
      .setColor(list.length === 0 ? '#00ff00' : '#ff9900')
      .setThumbnail(member.displayAvatarURL())
      .setDescription(list.length === 0 ? 'Aucun avertissement' : `**${list.length}** avertissement${list.length > 1 ? 's' : ''}`)
      .setFooter({ text: `Demandé par ${interaction.user.tag}` })
      .setTimestamp();

    if (list.length > 0) {
      embed.addFields(list.slice(-10).map((w, i) => ({
        name: `Warn #${list.length - i}`,
        value: `Modérateur : <@${w.mod}>\nRaison : ${w.reason}\nDate : <t:${Math.floor(w.date / 1000)}>`,
        inline: false
      })));
    }

    await interaction.editReply({ embeds: [embed] });
  },
};