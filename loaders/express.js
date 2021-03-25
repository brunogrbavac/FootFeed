//u ovom fileu uključujemo sav middleware od session storea do error handling middlwarea koji je uvijek zadnji
const config = require('../config');

module.exports = (app) => { //error handling middleware W
    app.use((err,req,res,next) => {
        res.status(err.status || 500);
        res.json({
            error: { message:err.message,},
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