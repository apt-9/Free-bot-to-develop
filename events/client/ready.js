module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log('Je suis prêt');


        // Instantané 
        const devGuild = await client.guilds.cache.get('975478483629256704');
        devGuild.commands.set(client.commands.map(cmd => cmd));
    },
};