var express = require('express');
var usuarioController = require('../controllers/usuarioController');
var api = express.Router();

api.post('/registro_usuario_admin', usuarioController.registro_usuario_admin);
api.post('/login_usuario', usuarioController.login_usuario);
api.put('/actualizar_usuario/:id', usuarioController.actualizar_usuario);
api.delete('/eliminar_usuario/:id', usuarioController.eliminar_usuario);
api.get('/obtener_usuarios', usuarioController.obtener_usuarios);

module.exports = api;