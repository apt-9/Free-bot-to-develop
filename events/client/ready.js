const Logger = require('../../utils/Logger');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        Logger.client(' - prêt à être utilisé');


        // Instantané 
        const devGuild = await client.guilds.cache.get('975478483629256704');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};