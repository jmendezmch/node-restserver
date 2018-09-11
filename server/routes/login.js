const express = require('express');
const bcrypt = require('bcrypt');
// const _ = require('underscore');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const app = express();

app.post('/login', function(req, res) {
    let body = req.body;
    Usuario.findOne({ email: body.email }).exec((err, usuarioDB) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                err
            });
        }
        if (!usuarioDB) {
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Correo incorrecto'
                }
            });
        }
        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).send({
                ok: false,
                err: {
                    message: 'Contraseña incorrecta'
                }
            });
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
        return res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });
    });

});




module.exports = app;