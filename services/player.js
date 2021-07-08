module.exports = class Player{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(player, player_team, team, logger){
        this.Player = player;
        this.player_team = player_team;
        this.Team = team;
        this.Logger = logger;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvaćanja svih igrača iz baze 
    
    async getAllPlayersOfTeam(request){
        try{
            const team = await this.Team.findOne({where: { AF_ID_team: request.params.id }});
            const players = await team.getTeams_player({raw: true, order: [['AF_ID_player', 'ASC']]}); //dohvaća sve redke iz tablice u bazi koja odgovara Sequelize modelu Player

            let response = { firstXI: [], substitutes: []};
            for(let player of players) {
                if(player['player_team.start']) response.firstXI.push(player);
            };

            let need = 11 - response.firstXI.length;
            let counter = 0;
            for(let i=0; i<need; i++){
                let j = counter;
                while(j<players.length){
                    if(!players[j]['player_team.start']){
                        response.firstXI.push(players[j]);
                        await this.player_team.update({start:true},{where: {AF_ID_team: players[j]['player_team.AF_ID_team'], AF_ID_player: players[j]['player_team.AF_ID_player']}});
                        let playa = {...players[j], 'player_team.start':true};
                        console.log(playa);
                        response.firstXI.push(playa);
                        counter = j+1;
                        j = players.length;
                    };
                    j++;
                };
            };

            for(let i=0; i<8; i++){
                let j = counter;
                while(j<players.length){
                    if(!players[j]['player_team.start'] && !response.firstXI.includes(players[j])){
                        response.substitutes.push(players[j]);
                        counter = j+1;
                        j = players.length;
                    };
                    j++;
                }
            };

            this.Logger.info("Successfully loaded " + players.length + " players from team " + request.params.id + ".");
            return response;
        }catch(error){
            this.Logger.error('Error occured in ˝getAllPlayersOfTeam˝ function (service)' + error);
            throw(error);
        }
    };
};