const winston = require('winston'); 
const { Console } = require('winston/lib/winston/transports');

winston.loggers.add('nodeLogger',{
    // level: 'debug', // ispisuje ukoliko je level poruke <= ovom levelu W 
    levels: winston.config.npm.levels, // kojim levelima bitnosti poruke se služimo W
    // format: winston.format.combine( // format ispisa poruke W
    //     winston.format.label({
    //         label:'👨‍💻'
    //     }),
    //     winston.format.timestamp(),
    //     winston.format.cli()
    // ),
    transports: [ // file, konzola itd. Datoteka u koju ispisujemo logove. W
        new winston.transports.Console(
            { //mozda default preuzme format i level od loggera
            level:'debug',//pretposljednji level
            format: winston.format.combine(
                winston.format.timestamp({format: 'DD-MMM-YYYY HH:mm:ss'}),
                // winston.format.cli(),
                winston.format.colorize(),
                winston.format.align(),
                winston.format.printf(info => `${(info.level=='\u001b[31merror\u001b[39m'?'❌':'✔️ ')}   ${info.timestamp} ${info.level}: ${info.message}`),
        ),}),
    ]
});

const logger=winston.loggers.get('nodeLogger');

module.exports={
    nodeLogger:logger
}
