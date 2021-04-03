const express = require('express'); 
const loaders = require('./loaders'); //pokrećemo sequelize i middleware funkcije (te main router postavljamo) za express server
const config  = require('./config');
const { nodeLogger } = require('./loaders/logger'); //podešeni Winston logger W
const app = express();

async function start(){
    try{
        await loaders.load(app);
        app.listen(config.port, ()=>{ nodeLogger.info(`Server is listening on port ${config.port} . `)}); //instanca express servera W
    }catch(error){
        nodeLogger.info(error);
    };
};

start();