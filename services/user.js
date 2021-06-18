module.exports = class User{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(user,logger){
        this.User = user;
        this.Logger = logger;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvaćanja usera po imenu
    
    async getUserByUsername(request){
        try{
            const user = await this.User.findOne({where: { username: request.username}}); //dohvaća 1 redke iz tablice u bazi koja odgovara Sequelize modelu User
            this.Logger.info("Successfully loaded "+ request.username+' from the database.');
            return user;
        }catch(error){
            this.Logger.error('Error occured in ˝getUserByUsername˝ function (service)' + error);
            throw(error);
        }
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija dohvaćanja usera po ID

    async getUserById(id){
        try{
            const user = await this.User.findOne({where: { user_id: id}}); 
            this.Logger.info("Successfully loaded user"+ id+' from the database.');
            return user;
        }catch(error){
            this.Logger.error('Error occured in ˝getUserById˝ function (service)' + error);
            throw(error);
        }
    };
};