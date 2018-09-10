process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


// BASE DE DATOS
let urlDB;
// if (process.env.NODE_ENV == 'dev') {
//     urlDB = 'mongodb://localhost:27017/jazo-cafe';
// } else {
urlDB = 'mongodb://jazo:jujuy969@ds033828.mlab.com:33828/jazo-cafe'
    // }

process.env.URLDB = urlDB;