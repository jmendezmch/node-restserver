process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = '48h';

// CONTRASENA DEL TOKEN
process.env.SEED = process.env.SEED || 'JAZO-TOKEN';

// ID PARA AUTH CON GOOGLE
process.env.CLIENT_ID = process.env.CLIENT_ID || '762295368431-gb104gc5h1n6g6g012qfpangb13dvcg5.apps.googleusercontent.com';
// BASE DE DATOS
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/jazo-cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;