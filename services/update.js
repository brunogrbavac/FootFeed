const axios = require('axios');
const config = require('../config');
const { nodeLogger } = require('../loaders/logger');
module.exports = class Update{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(team, team_competition, player, player_team, nodeLogger){
        this.Team = team;
        this.Team_Competition = team_competition;
        this.Player = player;
        this.Player_Team = player_team;
        this.Logger = nodeLogger
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija koja ažurira rostere i postave cijelih liga sa APIFOOTBALLA

    async sleep (delay){ // koristimo da ne probijemo rate limit API FOOTBALLA
        return new Promise((resolve)=> setTimeout(resolve, delay));
    }; 

    async updateFromAPIFOOTBALL(request) // request body objekt s podacima za unos
    {
        try {
            for(let league of request.leagues){

                //---------------------------------------------------------------------------------------------------------------------- funkcija koja formira opcije za APIFOOTBALL request
                const options = (path,params) => {
                    return {
                        method: 'GET',
                        url: 'https://api-football-v1.p.rapidapi.com/v3/' + path, //teams
                        params: params,
                        headers: {
                        'x-rapidapi-key': config.rapid_api_key,
                        'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
                        }
                    }
                };

                //---------------------------------------------------------------------------------------------------------------------- funkcija koja dohvaća APIFOOTBALL podatke, resolva promise i vraća podatke
                const axiosGet = async (options) => {
                    try {
                      const response = await axios.request(options);
                      const data = await response.data.response;
                      return data;
                    } catch (error) {
                        nodeLogger.error('Error in fetching  from API-Football '+error);
                        throw(error);
                    }
                };

                let teamsOfLeague = await axiosGet(options("teams",{league: String(league), season: '2020'}));
                nodeLogger.info("Loaded teams of competiton " + league + " for database update, " + teamsOfLeague.length + " of them in total.");

                //---------------------------------------------------------------------------------------------------------------------- brisanje klubova da ih mozemo refreshat
                await this.Team_Competition.destroy({
                    where: {
                      AF_ID_competition: league
                    }
                });
                nodeLogger.info("Teams deleted from "+league+" for league updating.");


                for(let team of teamsOfLeague){

                    let coach = await axiosGet(options("coachs",{team: team.team.id}));
                    //---------------------------------------------------------------------------------------------------------------------- dohvaćamo podatke o postavi zadnje utakmice i dodatne o igračima i reformatiramo kroz 2 for petlje
                    let fixtures = await axiosGet(options("fixtures", {season: "2020", team: team.team.id.toString()}));
                    nodeLogger.info(JSON.stringify(fixtures));
                    let lastFixtureId = {};
                    if(fixtures.length>0){ lastFixtureId = fixtures[fixtures.length-1].fixture.id;};
                    let lastFixtureLineup = await axiosGet(options("fixtures/lineups",{fixture: lastFixtureId,team: team.team.id.toString()}));  

                    let lineup =[];
                    for(let playerSearched of lastFixtureLineup[0].startXI){
                        lineup.push({
                            ...playerSearched.player, start: true
                        });
                    };
                    for(let playerSearched of lastFixtureLineup[0].substitutes){
                        lineup.push({
                            ...playerSearched.player, start: false
                        });
                    };

                    //---------------------------------------------------------------------------------------------------------------------- stvara ili azurira podatke o ekipi - najbitnije za trenera
                    const teamExists = await this.Team.findOne({where: {AF_ID_team: team.team.id}});
                    if(teamExists){
                        await this.Team.update({
                            name: team.team.name,
                            coach: coach[0].firstname +" " + coach[0].lastname,
                            logo: team.team.logo,
                            formation: lastFixtureLineup[0].formation,
                        },{
                            where:{
                                AF_ID_team: team.team.id,
                            }
                        });
                    }
                    else{
                        await this.Team.create({
                            AF_ID_team:team.team.id,
                            name:team.team.name,
                            coach:coach[0].firstname +" " + coach[0].lastname,
                            logo:team.team.logo,
                            formation: lastFixtureLineup[0].formation,
                        });
                    };
                    nodeLogger.info("Added/updated team "+ team.team.id + "|" + team.team.name + "|" + coach.firstname + " " + coach.lastname + "|" + team.team.name + "|" + team.team.logo + "." );

                    //---------------------------------------------------------------------------------------------------------------------- dodavanje ekipe u natjecanje - to je azuriranje klubova u lizi
                    await this.Team_Competition.create({
                        AF_ID_competition: league,
                        AF_ID_team: team.team.id,
                    });
                    nodeLogger.info("Added team"+team.team.id+" to competition "+league+".");

                    //---------------------------------------------------------------------------------------------------------------------- brisanje igrača da ih mozemo refreshat
                    await this.Player_Team.destroy({
                        where: {
                        AF_ID_team: team.team.id
                    }});
                    nodeLogger.info("Players deleted from " + team.team.id + "team for roster updating.");

                    
                    let players = await axiosGet(options("players",{team: team.team.id, season: '2020'}));
                    for(let player of players){
                        //---------------------------------------------------------------------------------------------------------------------- stvara ili azurira podatke o ekipi - najbitnije za trenera
                        const playerExists = await this.Player.findOne({where: {AF_ID_player: player.player.id}});

                        let playerMoreInfo = {pos: null, number: 0, start:false}; // da ne bude undefined
                        for( let playerSearched of lineup){
                            if(playerSearched.id === player.player.id){
                                playerMoreInfo = playerSearched;
                            };
                        };
                        
                        if(!playerExists){
                            await this.Player.create({
                                AF_ID_player: player.player.id,
                                name: player.player.firstname,
                                surname: player.player.lastname,
                                number: (playerMoreInfo.number !== null)?playerMoreInfo.number:0,
                                photo: player.player.photo,
                                position: playerMoreInfo.pos,
                            })
                        }
                        else{                     
                            await this.Player.update({
                                name: player.player.firstname,
                                surname: player.player.lastname,
                                photo: player.player.photo,
                                number: (playerMoreInfo.number !== null)?playerMoreInfo.number:0,
                                position: playerMoreInfo.pos,

                            },{
                                where:{
                                    AF_ID_player: player.player.id,
                                }
                            });
                        };
                        nodeLogger.info("Added/updated player "+ player.player.id + "|" + player.player.firstname + " " + player.player.lastname + "|" + player.player.photo + "." );

                        //---------------------------------------------------------------------------------------------------------------------- dodavanje igraca u ekipu - to je azuriranje ekipa
                        await this.Player_Team.create({
                            AF_ID_player: player.player.id,
                            AF_ID_team: team.team.id,
                            start: playerMoreInfo.start,
                        });
                        nodeLogger.info("Added player " + player.player.id + " to team " + team.team.id + " roster.");
                    };
                    nodeLogger.info("Loaded players of team " + team.team.id + " for database update, " + players.length + " of them in total.");
                    await this.sleep(10000);
                };

                await this.sleep(60000);
            }
        }
        catch(error){
            this.Logger.error('Error in function ˝updateFromAPIFOOTBALL˝ (service). ' + error);
            throw(error);
        }
    };
};
