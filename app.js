const express = require('express'); 
const loaders = require('./loaders'); // pokrećemo sequelize i middleware funkcije (te main router postavljamo) za express server
const config  = require('./config');
const { nodeLogger } = require('./loaders/logger'); // podešeni Winston logger W
const app = express();
const http = require('http');
const server = http.createServer(app); // pogledaj potanje ova dva retka šta rade

async function start(){
    try{
        await loaders.load(app, server);
        server.listen(config.port, ()=>{ nodeLogger.info(`Server is listening on port ${config.port} . `)}); // instanca express servera W
    }catch(error){
        nodeLogger.error(error);
    };
};

start();