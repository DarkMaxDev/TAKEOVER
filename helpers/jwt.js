var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'gustavo';

exports.createToken = function(usuario) {
    var payload = {
        sub: usuario._id,
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().add(1, 'year').unix()
    }

    return jwt.encode(payload, secret);
}