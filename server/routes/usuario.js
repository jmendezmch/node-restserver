const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

const Usuario = require('../models/usuario');
const { verificaToken, verificaAdminRol } = require('../middlewares/autenticacion');

app.post('/usuario', [verificaToken, verificaAdminRol], (req, res) => {
    let body = req.body;
    // let password = 
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(500).send({
                ok: false,
                err
            });
        }
        // usuarioDB.password = null;
        return res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

app.put('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
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
                    message: 'No existe el usuario'
                }
            });
        }
        return res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

app.get('/usuario', verificaToken, (req, res) => {
    let desde = Number(req.query.desde) || 0;
    desde = Number(desde);
    let limite = Number(req.query.limite) || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(500).send({
                    ok: false,
                    err
                });
            }
            Usuario.count({ estado: true }, (err, count) => {
                return res.json({
                    ok: true,
                    total: count,
                    usuarios
                });
            });

        });
});

app.delete('/usuario/:id', [verificaToken, verificaAdminRol], (req, res) => {
    let id = req.params.id;
    // Usuario.findByIdAndRemove(id, (err, usuarioDB) => {
    //     if (err) {
    //         return res.status(400).send({
    //             ok: false,
    //             err
    //         });
    //     }
    //     if (!usuarioDB) {
    //         return res.status(400).send({
    //             ok: false,
    //             err: {
    //                 message: 'No existe el usuario'
    //             }
    //         });
    //     }
    //     return res.json({
    //         ok: true,
    //         usuario: usuarioDB
    //     });
    // });
    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true }, (err, usuarioDB) => {
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
                    message: 'No existe el usuario'
                }
            });
        }
        return res.json({
            ok: true,
            usuario: usuarioDB
        });

    });
});

module.exports = app;