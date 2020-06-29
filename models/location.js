var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var locationSchema = new Schema({
    ciudad: { type: String, required: [true, 'La ciudad es necesario'] },
    direccion: { type: String, required: [true, 'La direccion es necesario'] },
    telefono: { type: String, required: [true, 'El telefono es necesario'] },
    nombre_contacto: { type: String, required: [true, 'El nombre de contacto es necesario'] },
    email: { type: String, required: [true, 'El email es necesario'] },
    celular: { type: String, required: [true, 'El celular es necesario'] },
    
    provider: {
        type: Schema.Types.ObjectId,
        ref: 'Provider',
        required: [true, 'El id Proveedor es un campo obligatorio ']
    }
});


module.exports = mongoose.model('Location', locationSchema);
