const { event_instance } = require('../../services'); // dohvaćamo stvorenu funkcionalnu instancu klase (objekt) za rad sa Sequelize modelom Event iz servicea
const { nodeLogger } = require('../../loaders/logger');

// kontroler ima sve funkcije koje nam trebaju kao reakcija na requestove
module.exports = {
    createEvent: async (msg, room, socket, io) => {
        try{
            let event = await event_instance.createEvent(msg); 
            let code;
            if(event.type==="Goal"){ code = '/event/Goal' }
            else if(event.type==="Halftime"){ code = '/event/Halftime' }
            else if(event.type==="Second half"){ code = '/event/Secondhalf' }
            else if(event.type==="End"){ code = '/event/End'}
            else { code = '/event/regular'};

            console.log(code+' '+event);
            io.to(room).emit(`${code}`,event);
        }catch(error){
            nodeLogger.error('Error occured in ˝createEvent˝  HTTP function (controller) ' + error);
            // next(error); // ovaj error će završiti u loader na glavnom error handling middlewareu 
        };
    }
};