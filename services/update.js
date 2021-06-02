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

    async updateFromAPIFOOTBALL(request) // request body objekt s podacima za unos
    {
        try {
            for(let league of request.leagues){

                //---------------------------------------------------------------------------------------------------------------------- funkcija koja formira opcije za APIFOOTBALL request
                const options = (path,params) => {
                    return {
                        method: 'GET',
                        url: 'https://api-football-v1.p.rapidapi.com/v3/' + path, //teams
                        params: params, //{league: String(league), season: '2020'},
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
                nodeLogger.info("Loaded teams of competiton "+league+" for database update, "+ teamsOfLeague.length()+" of them in total.");

                //---------------------------------------------------------------------------------------------------------------------- brisanje klubova da ih mozemo refreshat
                await this.Team_Competition.destroy({
                    where: {
                      AF_ID_competition: league
                    }
                });
                nodeLogger.info("Teams deleted from "+league+" for league updating.");


                for(let team of teamsOfLeague){

                    let coach = await axiosGet(options("coachs",{team: team.team.id}));

                    //---------------------------------------------------------------------------------------------------------------------- stvara ili azurira podatke o ekipi - najbitnije za trenera
                    const teamExists = await this.Team.findOne({where: {AF_ID_team: team.team.id}});
                    if(teamExists){
                        await this.Team.update({
                            name: team.team.name,
                            coach: coach.firstname +" " + coach.lastname,
                            logo: team.team.logo,
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
                            coach:coach.firstname +" " + coach.lastname,
                            logo:team.team.logo,
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

                    
                    let players= await axiosGet(options("players",{team: team.team.id, season: '2020'}));
                    for(let player of players){
                        //---------------------------------------------------------------------------------------------------------------------- stvara ili azurira podatke o ekipi - najbitnije za trenera
                        const playerExists = await this.Player.findOne({where: {AF_ID_player: player.player.id}});
                        if(!playerExists){
                            await this.Player.create({
                                AF_ID_player: player.player.id,
                                name: player.player.firstname,
                                surname: player.player.lastname,
                                number: players.indexOf(player),
                                photo: player.player.photo
                            })
                        }
                        else{                     
                            await this.Player.update({
                                name: player.player.firstname,
                                surname: player.player.lastname,
                                photo: player.player.photo,
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
                            AF_ID_team: team.team.id
                        });
                        nodeLogger.info("Added player" + player.player.id + " to team " + team.team.id + " roster.");
                    }
                };

            }
        }
        catch(error){
            this.Logger.error('Error in function ˝updateFromAPIFOOTBALL˝ (service). ' + error);
            throw(error);
        }
    };
};
