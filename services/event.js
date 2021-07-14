module.exports = class Event{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(event, match, player_event, player, logger){
        this.Match = match;
        this.Event = event;
        this.Logger = logger;
        this.Player_Event = player_event;
        this.Player = player;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija stvaranja događaja na nekom susretu

    async createEvent(message) // message objekt s podacima za unos
    {
        console.log(message);
        try {
            let matchExists = await this.Match.findOne({where: {match_id: message.match_id}});

            if(
                message.type &&
                message.time && 
                message.match_id && matchExists &&
                (message.home_team!==undefined) &&
                message.article || ["Second half","Halftime","End","Added time"].includes(message.type)
            ){
                const new_event = await this.Event.create({
                    type: message.type,
                    time: (message.type==="Second half")?"45":message.time,
                    match_id: message.match_id,
                    article: message.article,
                    home_team: message.home_team
                });
                
                let start;
                let live;
                if(message.type==="Second half"){start = new Date(new Date() -2700000 ); await this.Match.update({start: start },{where:{match_id:message.match_id}});};
                if(message.type==="Halftime"){start = new Date('1/1/2000');await this.Match.update({start: start },{where:{match_id:message.match_id}});};
                if(message.type==="End"){await this.Match.update({live: false },{where:{match_id:message.match_id}});};
                if(message.type.includes("Goal")){await this.Match.update({result: message.result },{where:{match_id:message.match_id}});};


                for(let i=0; i<message.players_id.length;i++){
                    await this.Player_Event.create({
                        event_id: new_event.event_id,
                        AF_ID_player: message.players_id[i],
                        order: i+1,
                    });
                };

                let players = await new_event.getEvents_player();
                let ret = players.map(player=>player.dataValues);

                this.Logger.info('Event '+message.type+'|' +message.time+'|' +' added succesfully to the match with ID: '+message.match_id+'. (With players that participated.)');
                return {...new_event.dataValues, players: ret, start: start, live:live, result: message.result};
            }
            else throw(new Error('Invalid input for creating a event.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createEvent˝ (service). ' + error);
            throw(error);
        }
    };
};
