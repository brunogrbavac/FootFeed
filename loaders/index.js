const { DatabaseConnection } = require('./sequelize');
const { nodeLogger } = require('./logger');

module.exports={
    load: async function(app){
        try{
            await DatabaseConnection();
            nodeLogger.info("Sequelize started and connected to the database successfully.");
        }catch(error){
            nodeLogger.error(error);
            throw(new Error());
        };
    }
};