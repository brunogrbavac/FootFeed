//u ovom fileu uključujemo sav middleware od session storea do error handling middlwarea koji je uvijek zadnji
const config = require('../config');
const {main_router} = require('../api');
const cors = require('cors');
const express = require("express");
const session = require('express-session');

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

module.exports = (app, httpLogger) => {

    app.use(express.json());

    app.use(session({
        saveUninitialized: true,
        resave: false,
        secret: config.cookie_secret,
        name: "user_session",
        store: new (require('connect-pg-simple')(session))({
            conString: config.database_url,
            tableName: "session",
            pruneSessionInterval:60,
        }),
        cookie:{maxAge: 1000*60*60}, // 1 sat (u milisekudama)
    }));

    app.use(cors(corsOptions));
    app.options("/*", function(req, res, next){// regularni izraz /*-> ovo se odnosi na sve rute koji pocinju sa /-> TO SU ZAPRAVO SVE RUTE
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
         res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
         res.header('Access-Control-Allow-Credentials','true');
         res.send(200);
    });
    
    app.use(httpLogger); //mountanje middlewarea se vrši funkcijom .use  - funkcije koje se izvrše kada poziv ide na naznačeni path - ovdje patha nema pa ide uvijek? W
    
    app.use('/', main_router); //router je isto ispravan middlware
    
    app.use((err,req,res,next) => { //error handling middleware, ovo će se pozvati kao callback kroz next u catchu svih kontrolera ruta W
        res.status(err.status || 500); //server-side error
        res.json({
            error: { message: err.message},
        });
    });
};




















// app.use((err,req,res,next) => {//midleware error handler-> ima 4 argumenta-> bit ce zadnja u midleware stacku i pozivom nexta u slucaju errora ce greska sigurno doci do nje i biti handleana i dobit cemo resposne
//     res.status(err.status || 500);//STATUS ZA SVE GRESKE NA STRANIC SERVERA CE BITI 500-> PRESUMJERIMO SVE GRESKE NA OVAJ ERROR HANDLER MIDDLEWARE POZIVOM next(error)
//     res.json({
//       error: {
//         message: err.message,
//       },
//     });
//   });