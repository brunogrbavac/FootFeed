const express = require('express'); //instanca express servera
const loaders = require('./loaders'); //pokrećemo sequelize i middleware funkcije (te main router postavljamo) za express server
const config  = require('./config');
const { nodeLogger } = require('./loaders/logger'); //podešeni Winston logger W
const app = express();

async function start(){
    try{
        await loaders.load(app);
        app.listen(config.port, ()=>{ nodeLogger.info(`Server is listening on port ${config.port} `)});
    }catch(error){
        nodeLogger.error(error);
    };
};

start();