const { DatabaseConnection } = require('./sequelize');
const express = require('./express'); //pokretanje middleware funkcija i main routera za express server
const { nodeLogger } = require('./logger');

module.exports={
    load: async function(app){
        try{
            await DatabaseConnection();
            nodeLogger.info("Sequelize started and connected to the database successfully.");
            try{
                await express(app);
                nodeLogger.info('Express has loaded successfully.');
            }catch(error){
                nodeLogger.error(error);
                throw(new Error()); //baca exception i terminira program W
            };
        }catch(error){
            nodeLogger.error(error);
            throw(new Error());
        };
    }
};