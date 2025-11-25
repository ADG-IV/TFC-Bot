const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Teste la latence du bot'),

  async execute(interaction) {
    const latency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    await interaction.editReply({
      content: `Pong !\nLatence message : **${latency}ms**\nLatence API : **${apiLatency}ms**`
    });
  },
};