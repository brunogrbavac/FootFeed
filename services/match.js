module.exports = class Match{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(match,team,event,logger){
        this.Match = match;
        this.Team = team;
        this.Logger = logger;
        this.Event=event;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija stvaranja susreta

    async createMatch(request) // request body objekt s podacima za unos
    {
        try {
            let homeExists = await this.Team.findOne({where: {AF_ID_team: request.home_team}});
            let guestExists = await this.Team.findOne({where: {AF_ID_team: request.guest_team}});

            if(
                request.date_time &&
                request.article && 
                request.stadium &&
                request.home_team && homeExists &&
                request.guest_team && guestExists
            ){
                const new_match = await this.Match.create({
                    date_time: request.date_time,
                    article: request.article,
                    stadium: request.stadium,
                    home_team: request.home_team,
                    guest_team: request.guest_team
                });

                this.Logger.info('Match added succesfully to the database. '+ request.home_team +'|'+ request.guest_team +'|'+ request.date_time +'|'+ request.article +'|'+ request.stadium );
            }
            else throw(new Error('Invalid input for creating a match.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createMatch˝ (service). ' + error);
            throw(error);
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvata svih susreta ikad
    
    async getAllMatches(){
        try{
            const matches = await this.Match.findAll(); // dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Match
            this.Logger.info('All matches succesfully queried. ');
            return matches;
        }catch(error){
            this.Logger.error('Error occured in ˝getAllMatches˝ function (service)' + error);
            throw(error);
        }
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvata svih događaja jednog susreta

    async getAllMatchEvents(request) // request body objekt s podacima za unos
    {
        try {
            let matchExists = await this.Match.findOne({where: {match_id: request.match_id}});
            if(
                request.match_id && matchExists
            ){
                const matchSelected = await this.Match.findOne({where: {match_id: request.match_id}});
                const events = await matchSelected.getEvents(); // sequelize funkcija

                let response = [];

                this.Logger.info('Events of match succesfully queried. '+ events.length() + ' events total for match ID: '+request.match_id+'.');

                for(let i=0; i<events.length;i++){
                    let players = await events[i].getEvents_player();
                    response.push({
                        event_id: events[i].event_id,
                        type: events[i].type,
                        time: events[i].time,
                        match_id: request.match_id,
                        players: players,
                        article: events[i].article,
                    });
                    this.Logger.info('Players of event '+ events[i].event_id+' succesfully loaded. In total '+ players.length()+' players.');
                }
                return response;
            }
            else throw(new Error('Invalid input for geting events of a match.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createEvent˝ (service). ' + error);
            throw(error);
        }
    };
};