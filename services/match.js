module.exports = class Match{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(match,team,event,photo,user,competition,logger){
        this.Match = match;
        this.Team = team;
        this.Logger = logger;
        this.Event = event;
        this.Photo = photo;
        this.User = user;
        this.Competition = competition;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija stvaranja susreta

    async createMatch(request) // request body objekt s podacima za unos
    {
        try {
            let homeExists = await this.Team.findOne({where: {AF_ID_team: request.body.home_team}});
            let guestExists = await this.Team.findOne({where: {AF_ID_team: request.body.guest_team}});
            let userExists = await this.User.findOne({where: {user_id: request.session.user}});

            if(
                request.body.date_time &&
                request.body.article && 
                request.body.stadium &&
                request.body.competition &&
                request.body.home_team && homeExists &&
                request.body.guest_team && guestExists &&
                request.session.user && userExists
            ){
                const new_match = await this.Match.create({
                    date_time: request.body.date_time,
                    article: request.body.article,
                    stadium: request.body.stadium,
                    home_team: request.body.home_team,
                    guest_team: request.body.guest_team,
                    user: request.session.user,
                    competition: request.body.competition
                });
                this.Logger.info('User ' + request.session.user + ' created a match ' + new_match.match_id + ' theat was added succesfully to the database. '+ request.body.home_team +'|'+ request.body.guest_team +'|'+ request.body.date_time +'|'+ request.body.article +'|'+ request.body.stadium );
                return "OK";
            }
            else throw(new Error('Invalid input for creating a match.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createMatch˝ (service). ' + error);
            throw(error);
        }
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvata svih susreta ikad
    
    async getAllMatches(){
        try{
            const matches = await this.Match.findAll({raw: true} ); // dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Match

            let finalResponse = [];
            for(let match of matches){
                const photos = await this.Photo.findAll({ where : { match_id : match.match_id }, attributes: ['id','description']});
                const user = await this.User.findOne({ where : { user_id : match.user }, attributes: ['user_id', 'username']});
                const competition = await this.Competition.findOne({ where : { AF_ID_competition : match.competition }});
                const home_team = await this.Team.findOne({ where : { AF_ID_team : match.home_team }});
                const guest_team = await this.Team.findOne({ where : { AF_ID_team : match.guest_team }});

                finalResponse.push({
                    ...match,
                    user: user, // PREPIŠE BIVŠI USER
                    competition: competition,
                    home_team: home_team,
                    guest_team: guest_team,
                    photos: photos,
                });
            };
            this.Logger.info('All matches succesfully queried. ');
            return finalResponse;
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

                console.log(events);

                let eventsForResponse = [];

                this.Logger.info('Events of match succesfully queried. '+ events.length + ' events total for match ID: '+ request.match_id +'.');

                for(let i=0; i<events.length; i++){
                    let players = await events[i].getEvents_player();
                    eventsForResponse.push({
                        event_id: events[i].event_id,
                        type: events[i].type,
                        time: events[i].time,
                        match_id: request.match_id,
                        players: players,
                        article: events[i].article,
                    });
                    this.Logger.info('Players of event '+ events[i].event_id+' succesfully loaded. In total '+ players.length+' players.');
                }
                return { ...matchExists.dataValues, events: eventsForResponse };
            }
            else throw(new Error('Invalid input for geting events of a match.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝createEvent˝ (service). ' + error);
            throw(error);
        }
    };
};