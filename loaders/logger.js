const winston = require('winston');

winston.loggers.add('nodeLogger',{
    level: 'debug', // ispisuje ukoliko je level poruke <= ovom levelu
    levels: winston.config.npm.levels, // kojim levelima bitnosti poruke se služimo 
    format: winston.format.combine( // format ispisa poruke
        winston.format.label({
            label:'👨‍💻'
        }),
        winston.format.timestamp(),
        winston.format.cli()
    ),
    transports: [ // file, konzola itd. Datoteka u koju ispisujemo logove.
        new winston.transports.Console(
        //     { //mozda default preuzme format i level od loggera
        //     level:'debug',//pretposljednji level
        //     format: winston.format.combine(
        //         winston.format.label({
        //             label:'👨‍💻'
        //         }),
        //         winston.format.timestamp(),
        //         winston.format.cli()
        //     ),
        //  }
         ) 
    ]
});

const logger=winston.loggers.get('nodeLogger');

module.exports={
    nodeLogger:logger
}
