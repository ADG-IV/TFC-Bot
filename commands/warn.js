const { SlashCommandBuilder, PermissionsBitField, InteractionResponseFlags } = require('discord.js');

// Compteur temporaire en mémoire (disparait au redémarrage)
// → plus tard tu pourras remplacer par une DB (Quick.DB, Mongo, etc.)
const warns = new Map(); // userId → nombre de warns

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Avertir un membre')
    .addUserOption(o => o
      .setName('membre')
      .setDescription('Le membre à avertir')
      .setRequired(true))
    .addStringOption(o => o
      .setName('raison')
      .setDescription('Raison de l’avertissement')
      .setRequired(true)),

  async execute(interaction) {
    // Vérif permission (on utilise ModerateMembers comme pour mute)
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      return interaction.editReply({
        content: 'Tu n’as pas la permission d’avertir des membres.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    const member = interaction.options.getMember('membre');
    const reason = interaction.options.getString('raison');

    // Ne pas pouvoir se warn soi-même ou le bot
    if (member.id === interaction.user.id) {
      return interaction.editReply({
        content: 'Tu ne peux pas t’avertir toi-même !',
        flags: InteractionResponseFlags.Ephemeral
      });
    }
    if (member.id === interaction.client.user.id) {
      return interaction.editReply({
        content: 'Je ne peux pas m’avertir moi-même.',
        flags: InteractionResponseFlags.Ephemeral
      });
    }

    // Incrémentation du compteur
    const previous = warns.get(member.id) || 0;
    const total = previous + 1;
    warns.set(member.id, total);

    // Message public
    await interaction.editReply({
      content: `**${member.user.tag}** a reçu un avertissement (**${total}** au total).\n**Raison :** ${reason}`
    });
  },
};