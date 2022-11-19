const mongoose = require('mongoose');

const guildSchema = mongoose.Schema({
    id: String,
    prefix: { 'type': String, 'default': '!' },
    logChannel: { 'type': String, 'default': '1042494069370265720'}
});

module.exports = mongoose.model('Guild', guildSchema);