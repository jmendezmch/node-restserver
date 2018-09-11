require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// GLOBAL CONF
app.use(require('./routes/index'));


const port = process.env.PORT || 3000;

mongoose.connect(process.env.URLDB, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log('Base de datos ONLINE!');
    }
});


app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`);
});