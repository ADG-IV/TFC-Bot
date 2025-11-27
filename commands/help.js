const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Affiche toutes les commandes du bot'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('Commandes du TFC Bot')
      .setColor('#00aaff')
      .setThumbnail(interaction.client.user.displayAvatarURL({ size: 128 }))
      .setDescription('**17 commandes** • Modération, utilitaires et fun')
      .addFields(
        {
          name: 'Modération',
          value: '```/ban``` **Ban** • Bannir définitivement\n'
               + '```/kick``` **Kick** • Expulser un membre\n'
               + '```/mute``` **Mute** • Timeout (max 28j)\n'
               + '```/tempmute``` **Tempmute** • Mute temporaire (1h, 3d…)\n'
               + '```/warn``` **Warn** • Avertir un membre\n'
               + '```/warns``` **Warns** • Historique des warns\n'
               + '```/clearwarns``` **Clearwarns** • Supprimer les warns\n'
               + '```/unban``` **Unban** • Débannir par ID',
          inline: false
        },
        {
          name: 'Gestion de salon',
          value: '```/clear``` **Clear** • Supprimer 1–99 messages\n'
               + '```/lock``` **Lock** • Verrouiller le salon\n'
               + '```/unlock``` **Unlock** • Déverrouiller le salon\n'
               + '```/slowmode``` **Slowmode** • Mode lent (0 à 6h)',
          inline: false
        },
        {
          name: 'Rôles & Informations',
          value: '```/role add``` **Role add** • Ajouter un rôle\n'
               + '```/role remove``` **Role remove** • Retirer un rôle\n'
               + '```/userinfo``` **Userinfo** • Infos détaillées',
          inline: false
        },
        {
          name: 'Fun & Utilitaires',
          value: '```/poll``` **Poll** • Créer un sondage\n'
               + '```/ping``` **Ping** • Latence du bot\n'
               + '```/help``` **Help** • Ce message',
          inline: false
        }
      )
      .setFooter({ text: 'TFC Bot • En ligne 24/7', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    // Toujours editReply → l’interaction est déjà deferrée dans index.js
    await interaction.editReply({ embeds: [embed] });
  },
};