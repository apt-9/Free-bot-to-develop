const { Client, Collection} = require ('discord.js');
const dotenv = require('dotenv'); dotenv.config();
const mongoose = require('mongoose');
const Logger = require('./utils/Logger');
const client = new Client({ intents: 515 });

client.commands = new Collection()

require(`./utils/handlers/EventUtil`)(client);
require(`./utils/handlers/CommandUtil`)(client)

process.on(`exit`, code => { Logger.client(`Le processus s'est arrêté avec le code: ${code}!`) });
process.on(`uncaughtException`, (err,origin) => { Logger.error(`UNCAUGHT_EXCEPTION: ${err}`, `Origine: ${origin}`) });
process.on(`unhandledRejection`, (reason, promise) => { Logger.warn(`UNHANDLED_REJECTION: ${reason}\n-----\n`, promise) });
process.on(`warning`, (...args) => Logger.warn(...args));

mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false,
    maxPoolSize: 10, 
    serverSelectionTimeoutMS: 5000, 
    socketTimeoutMS: 45000, 
    family: 4 
}).then(() => { Logger.client('- conneccté à la base de données'); })
.catch(err => { Logger.err(err); });

client.login(process.env.DISCORD_TOKEN);