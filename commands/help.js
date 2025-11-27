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
      .setDescription('Voici les **17** commandes disponibles :')
      .addFields(
        { name: '`/ban <membre> [raison]`', value: 'Bannir définitivement un membre', inline: false },
        { name: '`/kick <membre> [raison]`', value: 'Expulser un membre du serveur', inline: false },
        { name: '`/clear <nombre>`', value: 'Supprimer 1 à 99 messages', inline: false },
        { name: '`/mute <membre> <minutes> [raison]`', value: 'Mute un membre (max 28 jours)', inline: false },
        { name: '`/tempmute <membre> <durée> [raison]`', value: 'Mute temporaire (ex: 1h, 3d)', inline: false },
        { name: '`/warn <membre> <raison>`', value: 'Avertir un membre', inline: false },
        { name: '`/warns <membre>`', value: 'Voir l’historique des avertissements', inline: false },
        { name: '`/clearwarns <membre>`', value: 'Supprimer tous les warns d’un membre', inline: false },
        { name: '`/unban <id> [raison]`', value: 'Débannir un utilisateur par son ID', inline: false },
        { name: '`/lock [raison]`', value: 'Verrouiller le salon (seuls les modos parlent)', inline: false },
        { name: '`/unlock [raison]`', value: 'Déverrouiller le salon', inline: false },
        { name: '`/slowmode <secondes>`', value: 'Activer/désactiver le mode lent (0 à 6h)', inline: false },
        { name: '`/role add <membre> <rôle>`', value: 'Ajouter un rôle à un membre', inline: false },
        { name: '`/role remove <membre> <rôle>`', value: 'Retirer un rôle à un membre', inline: false },
        { name: '`/userinfo [membre]`', value: 'Afficher les infos d’un membre', inline: false },
        { name: '`/poll <question> [options]`', value: 'Créer un sondage avec réactions', inline: false },
        { name: '`/ping`', value: 'Tester la latence du bot', inline: false }
      )
      .setFooter({ text: 'TFC Bot • 17 commandes • En ligne 24/7', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.editReply({ embeds: [embed] });
  },
};