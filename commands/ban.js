// commands/ban.js
const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')                  // nom de la commande
        .setDescription('Bannir un membre')
        .addUserOption(option =>
            option.setName('membre')
                .setDescription('Le membre à bannir')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('raison')
                .setDescription('Raison du ban')
                .setRequired(false)),

    async execute(interaction) {
        // Vérif permission utilisateur
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return interaction.reply({ content: 'Tu n’as pas la permission de bannir.', ephemeral: true });
        }

        const member = interaction.options.getMember('membre');
        const reason = interaction.options.getString('raison') ?? 'Aucune raison';

        if (!member.bannable) {
            return interaction.reply({ content: 'Je ne peux pas bannir cette personne (rôle plus haut que moi ?).', ephemeral: true });
        }

        await member.ban({ reason });
        await interaction.reply(`**${member.user.tag}** a été banni !\nRaison : ${reason}`);
    },
};