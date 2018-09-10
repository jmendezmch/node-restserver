require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('./routes/usuario'));
const port = process.env.PORT || 3000;

// app.get('/', function(req, res) {
//     res.json('Hello World');
// });


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