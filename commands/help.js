const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche toutes les commandes du bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Commandes du TFC Bot')
      .setColor('#00aaff')
      .setThumbnail(interaction.client.user.displayAvatarURL())
      .setDescription('Voici les **7** commandes disponibles :')
      .addFields(
        { name: '`/ban <membre> [raison]`',   value: 'Bannir définitivement un membre', inline: false },
        { name: '`/kick <membre> [raison]`',  value: 'Expulser un membre du serveur', inline: false },
        { name: '`/clear <nombre>`',          value: 'Supprimer 1 à 99 messages', inline: false },
        { name: '`/mute <membre> <minutes> [raison]`', value: 'Mute un membre (max 28 jours)', inline: false },
        { name: '`/warn <membre> <raison>`',  value: 'Avertir un membre (comptabilisé)', inline: false },
        { name: '`/ping`',                    value: 'Tester la latence du bot', inline: false },
        { name: '`/help`',                    value: 'Afficher ce message', inline: false }
      )
      .setFooter({ text: 'TFC Bot • En ligne 24/7', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};