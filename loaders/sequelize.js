const { sequelize } = require('../models'); //index.js u moidelsima exporta sequelize unutar db objekta

module.exports={
    DatabaseConnection: async function()
    {
        console.log('Connecting to database...');
        try{
            await sequelize.authenticate(); //sequelize.authenticate() je asinkrona funkcija, stoga sa await PAUZIRAMO dok se ona ne izvrši (nismo izjednačili ništa s await tj. ne zanima nas što funkcija vraća) W
            console.log('Successfully connected to database.');
        }catch(error){
            console.log('Error when connecting to database '+error);
            process.exit(1); //proces skroz završavamo ukoliko se ne možemo spojiti na bazu, nakon što resolvamo promise W
        }
    }
}