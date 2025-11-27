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
          value: `
          </ban:1281234567890123456>  **Ban** • Bannir définitivement
          </kick:1281234567890123456>  **Kick** • Expulser un membre
          </mute:1281234567890123456>  **Mute** • Timeout (max 28j)
          </tempmute:1281234567890123456>  **Tempmute** • Mute temporaire (1h, 3d…)
          </warn:1281234567890123456>  **Warn** • Avertir un membre
          </warns:1281234567890123456>  **Warns** • Historique des warns
          </clearwarns:1281234567890123456>  **Clearwarns** • Supprimer les warns
          </unban:1281234567890123456>  **Unban** • Débannir par ID
          `.trim(),
          inline: false
        },
        {
          name: 'Gestion de salon',
          value: `
          </clear:1281234567890123456>  **Clear** • Supprimer 1–99 messages
          </lock:1281234567890123456>  **Lock** • Verrouiller le salon
          </unlock:1281234567890123456>  **Unlock** • Déverrouiller le salon
          </slowmode:1281234567890123456>  **Slowmode** • Mode lent (0 à 6h)
          `.trim(),
          inline: false
        },
        {
          name: 'Rôles & Informations',
          value: `
          </role add:1281234567890123456>  **Role add** • Ajouter un rôle
          </role remove:1281234567890123456>  **Role remove** • Retirer un rôle
          </userinfo:1281234567890123456>  **Userinfo** • Infos détaillées
          `.trim(),
          inline: false
        },
        {
          name: 'Fun & Utilitaires',
          value: `
          </poll:1281234567890123456>  **Poll** • Créer un sondage
          </ping:1281234567890123456>  **Ping** • Latence du bot
          </help:1281234567890123456>  **Help** • Ce message
          `.trim(),
          inline: false
        }
      )
      .setFooter({ text: 'TFC Bot • En ligne 24/7', iconURL: interaction.client.user.displayAvatarURL() })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};