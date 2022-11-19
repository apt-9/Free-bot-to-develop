const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'userinfo',
    type: 'USER',
    async runInteraction (client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new MessageEmbed()
            .setAuthor({name : `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? 'https://images.emojiterra.com/twitter/512px/1f916.png' : 'https://images.emojiterra.com/twitter/v13.1/512px/1f9d1.png' })
            .setColor('DARK_BUT_NOT_BLACK')
            .setImage(member.user.displayAvatarURL())
            .addFields(
                {name : 'Nom', value: `${member.displayName}`, inline: true},
                {name : 'Modérateur', value: `${member.kickable ? '🔴' : '🟢'}`, inline: true},
                {name : 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true},
                {name : 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(',@everyone', ' ')}` },
                {name : 'A créé son compte le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
                {name : 'A rejoint le serveur le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},
            )
        interaction.reply({ embeds: [embed], ephemeral: true });
    }
};