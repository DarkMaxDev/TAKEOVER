var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Productos = Schema({
    nombre: { type: String, required: true, unique: true },
    categoria: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('productos', Productos);