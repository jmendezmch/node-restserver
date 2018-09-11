const jwt = require('jsonwebtoken');

// VERIFICAR TOKEN
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, function(err, decoded) {
        if (err) {
            return res.status(401).send({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
        // decoded undefined
    });

};

// VERIFICAR EL ROL
let verificaAdminRol = (req, res, next) => {
    if (req.usuario.role != 'ADMIN_ROLE') {
        return res.status(401).send({
            ok: false,
            err: {
                message: 'Accion no permitida'
            }
        });
    }

    next();
}
module.exports = {
    verificaToken,
    verificaAdminRol
}