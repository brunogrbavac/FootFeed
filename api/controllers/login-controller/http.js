const { nodeLogger } = require('../../../loaders/logger');
const { user_instance } = require('../../../services');
const bcrypt = require('bcrypt');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    login: async (req,res,next) => {
        try{
            let user = await user_instance.getUserByUsername(req.body);
            if(user && await bcrypt.compare(req.body.password,user.password)){
                req.session.user = user.user_id;
                nodeLogger.info(`User ${user.user_id} succesfully logged in.`);
                res.status(200).json({user: user.user_id}); // vraća dohvaćene podatke (dohvaćene Sequelize querryjem findAll koji je zapravo obicni PSQL querry - preko funkcije u serviceu) kao JSON, te kao status šalje 200 = OK
            }
            else res.status(403).send("Cannot be logged in."); // 403 je cannot acces the resource
        }catch(error){
            nodeLogger.error('Error occured in ˝login˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    },
    logout: async (req,res,next) => {
        try {
            res.clearCookie('user_session',{ // briše cookie nakon logouta user_session je ime cookieja
                path: '/',
                httpOnly: true,
                domain:'localhost',
                sameSite:'lax',
                secure:false
            });
            var id = req.session.user; // samo da mozemo loggat nakon sta sve dobro prođe
            req.session.destroy(); // briše session iz memory store-a
            nodeLogger.info(`User ${id} succesfully logged out.`);
            res.sendStatus(204); // status 204 No Content 
        } catch (error) {
            nodelogger.error('Error occured in ˝logout˝  HTTP function (controller) ' + error);
            next(error);
        }
    },
    checkLogin: async (req,res,next) => {
        try{
            if(req.session.user){
                let user = await user_instance.getUserById(req.session.user);
                if(user){
                    res.status(200).json(user);
                }
                else res.status(403).send("Not logged in.");
            }
            else res.status(403).send("Not logged in.");
        }catch(error){
            nodeLogger.error('Error occured in ˝checkLogin˝  HTTP function (controller) ' + error);
            next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        }
    },
};