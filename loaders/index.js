const { DatabaseConnection } = require('./sequelize');
const express = require('./express'); //pokretanje middleware funkcija i main routera za express server
const { nodeLogger, httpLogger } = require('./logger');
const socketio = require('./socketio');

module.exports={
    load: async function(app, server){
        try{
            await DatabaseConnection();
            nodeLogger.info("Sequelize started and connected to the database successfully.");
            try{
                await express(app, httpLogger);
                nodeLogger.info('Express has loaded successfully.');
                try{
                    await socketio(server);
                    nodeLogger.info('Socketio has loaded successfully.');
                }catch(error){
                    nodeLogger.error(error);
                    throw(new Error()); //baca exception i terminira program W
                };
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