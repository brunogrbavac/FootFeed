const { nodeLogger } = require('../../loaders/logger');
const { user_instance } = require('../../services');

module.exports = {

    checkIfUser: (req,res,next) => {

        if(!req.session.user) // nije logiran kao user
        {
            // nodeLogger.info(JSON.stringify(req.session)+req.session.user+req.session.user_type);
            nodeLogger.info('Session is no longer valid.');
            res.status(401).send("Please Log In first."); // Not Authorized
        }
        else next();
    },
};