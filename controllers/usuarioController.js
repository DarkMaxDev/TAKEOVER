var Usuario = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');


const registro_usuario_admin = async function(req, res) {
    let data = req.body

    let usuarios = await Usuario.find({ email: data.email });

    console.log(usuarios);
    if (usuarios.length >= 1) {
        res.status(200).send({ data: undefined, message: 'El correo electrónico ya existe' });
    }
    bcrypt.hash('123456', null, null, async function(err, hash) {
        if (err) {
            res.status(200).send({ data: undefined, message: 'No se pudo encriptar la contraseña' });
        } else {
            data.password = hash;
            let usuario = await Usuario.create(data);
            res.status(200).send({ data: usuario });
        }
    });
}


const login_usuario = async function(req, res) {
    var data = req.body;
    var usuarios = await Usuario.find({ email: data.email });
    //VAMOS A VALIDAR SI EL CORREO EXISTE O NO EN LA BASE DE DATOS, ASI QUE USAREMOS LO SIGUIENTE
    if (usuarios.length >= 1) {
        bcrypt.compare(data.password, usuarios[0].password, async function(err, check) {
            //VERIFICACION DE LA CONTRASEÑA (PASSWORD)
            if (check) {
                res.status(200).send({
                    token: jwt.createToken(usuarios[0]),
                    usuario: usuarios[0]
                }); // ESTA LINEA SE COMPLEMETA CON LA CARPETA ----> HELPERS USANDO JWT.JS
            } else {
                res.status(200).send({ data: undefined, message: 'La contraseña es incorrecta' });
            }
        });
    } else {
        res.status(200).send({ data: undefined, message: 'El correo electronico no existe' });
    }
}

const actualizar_usuario = async function(req, res) {
    const usuarioId = req.params.id; // Obtener el ID del usuario a actualizar
    const newData = req.body; // Obtener los nuevos datos del usuario desde el cuerpo de la solicitud

    try {
        // Actualizar el usuario en la base de datos
        const usuarioActualizado = await Usuario.findByIdAndUpdate(usuarioId, newData, { new: true });

        if (usuarioActualizado) {
            res.status(200).send({ data: usuarioActualizado });
        } else {
            res.status(404).send({ data: undefined, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ data: undefined, message: 'Error al actualizar el usuario' });
    }
}

const eliminar_usuario = async function(req, res) {
    const usuarioId = req.params.id; // Obtener el ID del usuario a eliminar

    try {
        // Eliminar el usuario de la base de datos
        const usuarioEliminado = await Usuario.findByIdAndRemove(usuarioId);

        if (usuarioEliminado) {
            res.status(200).send({ data: usuarioEliminado });
        } else {
            res.status(404).send({ data: undefined, message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).send({ data: undefined, message: 'Error al eliminar el usuario' });
    }
}


const obtener_usuarios = async function(req, res) {
    try {
        const usuarios = await Usuario.find();
        res.status(200).send({ data: usuarios });
    } catch (error) {
        res.status(500).send({ data: undefined, message: 'Error al obtener los usuarios' });
    }
}

module.exports = {
    registro_usuario_admin,
    login_usuario,
    actualizar_usuario,
    eliminar_usuario,
    obtener_usuarios
}