const winston = require('winston'); 
const morgan = require('morgan');
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

const logger = winston.loggers.get('nodeLogger');


const http = morgan('dev',{   //format ispisa
    stream: {
        write(msg){
            logger.info(msg.substr(0, msg.lastIndexOf('\n')));//trazimo zadnji /n koji je dodan da izbjegnemo prazni red kod stvarnog ispisa-> substr uzme prvi član sve do indeksa zadnje pojave \n -> njega ne uzme i ne dobijemo prazni red
            /* inace bi dobili ovakav ispis
            info: GET / 302 17.303 ms - 68-> ovaj broj oznacava Content-length,broj nakon rute=status
            info: GET /login 304 4.429 ms - -
            info: GET /ok 304 2.691 ms - -*/
        }
    }
});

module.exports={
    nodeLogger: logger,
    httpLogger: http,
};
