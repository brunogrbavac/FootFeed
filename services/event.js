module.exports = class Event{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(event, match, player_event, logger){
        this.Match = match;
        this.Event = event;
        this.Logger = logger;
        this.Player_Event = player_event
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija stvaranja događaja na nekom susretu

    async createEvent(request) // request body objekt s podacima za unos
    {
        try {
            let matchExists = await this.Match.findOne({where: {match_id: request.match_id}});

            if(
                request.type &&
                request.time && 
                request.match_id && matchExists &&
                (request.home_team!==undefined) &&
                request.article
            ){
                const new_event = await this.Event.create({
                    type: request.type,
                    time: request.time,
                    match_id: request.match_id,
                    article: request.article,
                    home_team: request.home_team
                });


                for(let i=0; i<request.players_id.length;i++){
                    await this.Player_Event.create({
                        event_id: new_event.event_id,
                        AF_ID_player: request.players_id[i],
                        order: i+1
                    });
                };

                this.Logger.info('Event '+request.type+'|' +request.time+'|' +' added succesfully to the match with ID: '+request.match_id+'. (With players that participated.)');

            }
            else throw(new Error('Invalid input for creating a event.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createEvent˝ (service). ' + error);
            throw(error);
        }
    };
};
