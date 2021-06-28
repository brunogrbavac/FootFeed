module.exports = class Photo{ // ne exportamo OBJEKT kao inače već ES6 klasu za rad sa Sequelize MODELIMA
    
    constructor(photo,logger){
        this.Photo = photo;
        this.Logger = logger;
    };
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija uploadanja slika utakmice 
        
        async addMultiplePhotos(request){
            try{
                if(
                    request.files && // za single je file logično ali pazi
                    request.body.match_id
                ){
                    for( let photo of request.files){
                        this.Logger.info(JSON.stringify({
                            uri: photo.path,
                            match_id: request.body.match_id,
                            description: request.body.description,
                            size: photo.size,
                            MIME: photo.mimetype,
                        }));
                        const img = await this.Photo.create({
                            uri: photo.path,
                            match_id: request.body.match_id,
                            description: request.body.description,
                            size: photo.size,
                            MIME: photo.mimetype,
                        });
                        this.Logger.info(`Photo of match ${img.match_id} uploaded succesfully to ${img.uri}.`);
                    }
                }
                else throw(new Error('Invalid request for uploading a photo.')); // validator
            }catch(error){
                this.Logger.error('Error occured in ˝addPhoto˝ function (service)' + error);
                throw(error);
            }
        };
   
//-------------------------------------------------------------------------------------------------------------------------------------- funkcija uploadanja slika utakmice 
    
async getPhoto(id){
    try{
        if(id){
            const photo = await this.Photo.findOne({ where : { id : id }});
            this.Logger.info(`Photo ${id} fetched succesfully.`);
            return photo;
        }
        else throw(new Error('Photo with that URI does not exist.')); // validator
    }catch(error){
        this.Logger.error('Error occured in ˝getPhoto˝ function (service)' + error);
        throw(error);
    }
};    

};