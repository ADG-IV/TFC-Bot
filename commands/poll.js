const { SlashCommandBuilder, InteractionResponseFlags } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Crée un sondage')
    .addStringOption(o => o.setName('question').setDescription('La question').setRequired(true))
    .addStringOption(o => o.setName('options').setDescription('Séparées par | (max 10)').setRequired(false)),

  async execute(interaction) {
    const question = interaction.options.getString('question');
    const options = interaction.options.getString('options')?.split('|').map(o => o.trim()).filter(Boolean) || ['Oui', 'Non'];

    if (options.length > 10) {
      return interaction.editReply({ content: 'Maximum 10 options.', flags: InteractionResponseFlags.Ephemeral });
    }

    const emojis = ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣','🔟'];
    const text = options.map((opt, i) => `${emojis[i]} ${opt}`).join('\n');

    const msg = await interaction.editReply({ content: `**Sondage de ${interaction.user}**\n\n${question}\n\n${text}` });
    for (let i = 0; i < options.length; i++) await msg.react(emojis[i]);
  },
};