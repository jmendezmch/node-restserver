require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.json('Hello World');
});

app.get('/usuario', function(req, res) {
    res.json('GET usuario');
});

app.post('/usuario', function(req, res) {
    let body = req.body;
    res.json({
        body
    });
});

app.put('/usuario/:id', function(req, res) {
    let id = req.params['id'];
    res.json('PUT usuario: ' + id);
});

app.delete('/usuario', function(req, res) {
    res.json('DELETE usuario');
});


app.listen(port, () => {
    console.log(`Escuchando en el puerto: ${port}`);
});