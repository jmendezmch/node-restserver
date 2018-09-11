process.env.PORT = process.env.PORT || 3000;
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// VENCIMIENTO DEL TOKEN
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// CONTRASENA DEL TOKEN
process.env.SEED = process.env.SEED || 'JAZO-TOKEN';


// BASE DE DATOS
let urlDB;
if (process.env.NODE_ENV == 'dev') {
    urlDB = 'mongodb://localhost:27017/jazo-cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;