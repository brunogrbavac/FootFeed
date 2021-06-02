const bcrypt = require('bcrypt');
const config = require('../config/index');
const {nodelogger} = require('../loaders/logger');

module.exports = async function(password)
{
    try {
        const rounds = config.bcrypt.saltRounds;

        const salt = await bcrypt.genSalt(rounds); // vraća promise koji resolva sa vrijednosti od soli
        const hash = await bcrypt.hash(password,salt);

        return hash;
    } catch (error) {
        nodelogger.error('Error in hashing password '+error);
        throw(error);
    }
}