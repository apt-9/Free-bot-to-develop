const { Guild } = require('../../models/index');

module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, guild) {
        const createGuild = await new Guild({ id: guild.id });
        createGuild.save().then(g => console.log(`Nouveau serveur (${g.id})`));
    },
};