module.exports = class Competition{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(competition, team_competition, team, logger){
        this.Competition = competition;
        this.Team = team;
        this.Team_competition = team_competition;
        this.Logger = logger;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija stvaranja događaja na nekom susretu

    async getAllCompetitionsAndTeams(request) // request body objekt s podacima za unos
    {
        try {
            let competitions = await this.Competition.findAll();
            let finalResponse = [];
            for( let competition of competitions ){
                let teams = await competition.getTeams_competition();
                finalResponse.push({
                    ...competition.dataValues,
                    teams: teams,
                });
            };
            this.Logger.info('Succesfully fetched all leagues and their teams by "getAllCompetitionsAndTeams" successfull.');
            return finalResponse;
        }
        catch(error){
            this.Logger.error('Error in function ˝getAllCompetitionsAndTeams˝ (service). ' + error);
            throw(error);
        }
    };
};
