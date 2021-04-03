//u ovom fileu uključujemo sav middleware od session storea do error handling middlwarea koji je uvijek zadnji
const config = require('../config');
const {main_router} = require('../api');

module.exports = (app) => { 
    app.use('/', main_router);
    
    app.use((err,req,res,next) => { //error handling middleware, ovo će se pozvati kao callback kroz next u catchu svih kontrolera ruta W
        res.status(err.status || 500); //server-side error
        res.json({
            error: { message: err.message},
        });
    });
};




















// app.use((err, req, res, next) => {//midleware error handler-> ima 4 argumenta-> bit ce zadnja u midleware stacku i pozivom nexta u slucaju errora ce greska sigurno doci do nje i biti handleana i dobit cemo resposne
//     res.status(err.status || 500);//STATUS ZA SVE GRESKE NA STRANIC SERVERA CE BITI 500-> PRESUMJERIMO SVE GRESKE NA OVAJ ERROR HANDLER MIDDLEWARE POZIVOM next(error)
//     res.json({
//       error: {
//         message: err.message,
//       },
//     });
//   });