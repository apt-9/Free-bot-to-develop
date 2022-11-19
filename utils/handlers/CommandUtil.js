const { promisify } = require('util');
const { glob } = require('glob'); 
const pGlob = promisify(glob);

module.exports = async (client) => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async (cmdFile) => {
        const cmd = require(cmdFile);

        if (!cmd.name || (!cmd.description && cmd.type != 'USER')) return console.log(`-----\nCommande non-chargée: pas de nom et/ou description \nFichier -> ${cmdFile}\n-----`);
        client.commands.set(cmd.name, cmd);
        console.log(`Commande chargée: ${cmd.name}`);

        if (!cmd.category) return console.log(`-----\nCommande non-chargée: pas de catégorie\nFichier -> ${cmdFile}\n-----`)

        if (!cmd.permissions) return console.log(`-----\nCommande non-chargée: pas de permission\nFichier -> ${cmdFile}\n-----`)

        cmd.permissions.forEach(permission => {
            if (!permissionList.includes(permission)) {
                return console.log(`-----\n Commande non-déclenchée: erreur de typo sur la permission '${permission}'\nFichier -> ${cmdFile}\n-----`);
            }
            });

        client.commands.set(cmd.name, cmd);
        console.log(`Commande chargée; ${cmd.name}`)
    });
};

const permissionList = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES', 'MODERATE_MEMBERS'];
