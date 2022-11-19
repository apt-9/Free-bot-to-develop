const { MessageEmbed } = require('discord.js');
const { readdirSync } = require('fs');
const commandFolder = readdirSync('./commands');
const prefix = '+';

module.exports = {
    name: 'help',
    category:'utils',
    permissions: ['ADMINISTRATOR'],
    description: 'Commande help',
    async run (client, message, args) {
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
            .setColor('DARK_RED')
            .addField('Liste des commandes', `Une liste de toutes les catégories disponibles et leurs commandes.\nPour plus d'informations sur une commande, tapez \`${prefix}help <command>\``)
        
        for (const category of commandFolder){
            noArgsEmbed.addField(
                `${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                `\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``
            );
        }

        return message.channel.send({ embeds: [noArgsEmbed]});
    }
    },
    options: [
        {
            name: 'title',
            description: 'Taper le titre de votre sondage',
            type: 'STRING',
            required: true,
            
        },
    ],
    async runInteraction (client, interaction) {},
};