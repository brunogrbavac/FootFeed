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
                    headline: request.body.headline,
                    stadium: request.body.stadium,
                    home_team: request.body.home_team,
                    guest_team: request.body.guest_team,
                    user: request.session.user,
                    competition: request.body.competition,
                });
                this.Logger.info('User ' + request.session.user + ' created a match ' + new_match.match_id + ' theat was added succesfully to the database. '+ request.body.home_team +'|'+ request.body.guest_team +'|'+ request.body.date_time +'|'+ request.body.article +'|'+ request.body.stadium+'|'+ request.body.headline );
                return new_match;
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
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvata svih utakmica koje je stvorio User

async getAllUserMatches(request){
    try{
        const matches = await this.Match.findAll({where: {user: request.session.user}, raw: true} ); // dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Match

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
        this.Logger.info('All matches of user succesfully queried. ');
        return finalResponse;
    }catch(error){
        this.Logger.error('Error occured in ˝getAllUserMatches˝ function (service)' + error);
        throw(error);
    }
};
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija mijenja podatke određene utakmice

async editMatch(request){
    try{
        const match = await this.Match.findOne({where: {match_id: request.body.match_id}, raw: true} ); // dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Match

        if(match.user===request.session.user){
            await this.Match.update({
                date_time: request.body.date_time,
                article: request.body.article,
                headline: request.body.headline,
                stadium: request.body.stadium,
            },{where:{match_id: request.body.match_id}});
            return 200;
        }
        else return 403;
    }catch(error){
        this.Logger.error('Error occured in ˝editMatch˝ function (service)' + error);
        throw(error);
    };
};

//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvata svih događaja jednog susreta

    async getAllMatchEvents(matchId) 
    {
        try {
            let matchExists = await this.Match.findOne({where: {match_id: matchId}});

            if(
                matchId && matchExists
            ){
                const events = await matchExists.getEvents(); // sequelize funkcija
                const home_teamFull = await this.Team.findOne({ where : { AF_ID_team : matchExists.home_team }});
                const guest_teamFull = await this.Team.findOne({ where : { AF_ID_team : matchExists.guest_team }});
                const competitionFull = await this.Competition.findOne({ where : {AF_ID_competition : matchExists.competition }});
                let userFull = await this.User.findOne({where : {user_id: matchExists.user}, attributes : ['user_id', 'username']});
                const photos = await this.Photo.findAll({ where : { match_id : matchId }, attributes: ['id','description']});

                let eventsForResponse = [];
                let matchForResponse = {
                    ...matchExists.dataValues,
                    home_team: home_teamFull,
                    guest_team: guest_teamFull,
                    user: userFull,
                    competition: competitionFull,
                    photos: photos,
                }

                this.Logger.info('Events of match succesfully queried. '+ events.length + ' events total for match ID: '+ matchId +'.');

                for(let i=0; i<events.length; i++){
                    let players = await events[i].getEvents_player();
                    eventsForResponse.push({
                        event_id: events[i].event_id,
                        type: events[i].type,
                        time: events[i].time,
                        match_id: matchId,
                        players: players,
                        article: events[i].article,
                        home_team: events[i].home_team,
                    });
                    this.Logger.info('Players of event '+ events[i].event_id+' succesfully loaded. In total '+ players.length+' players.');
                }
                return { ...matchForResponse, events: eventsForResponse };
            }
            else throw(new Error('Invalid input for geting events of a match.')); // validator
        }
        catch(error){
            this.Logger.error('Error in function ˝getAllMatchEvents˝ (service). ' + error);
            throw(error);
        }
    };


    async goLiveMatch( match_id ){
        try{
            await this.Match.update({live: true, start: new Date()},{where:{match_id:match_id}});
        }
        catch(error){
            this.Logger.error('Error in function ˝goLiveMatch˝ (service). ' + error);
            throw(error);    
        }
    };


};
