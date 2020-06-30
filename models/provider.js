var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var providerSchema = new Schema({
    razon_social: { type: String, required: [true, 'La Razon Social es necesario'] },
    nombre_comercial: { type: String, required: [true, 'El nombre comercial es necesario'] },
    nombre_representante: { type: String, required: [true, 'El nombre del representante es necesario'] },
    ci_exp: { type: String, required: [true, 'El ci y su expedicion es necesario'] },
    email: { type: String, required: [true, 'La email es necesario'] },
    proveedor_de: { type: String, required: [true, 'El proveedor es necesario'] },
    rubro: { type: String, required: [true, 'El rubro es necesario'] },
    tipo: { type: String, required: [true, 'La tipo es necesario'] },
    nit: { type: String, required: [true, 'El nit es necesario'] },
    pagina_web: { type: String},
    pais: { type: String, required: [true, 'El pais es necesario'] },
    img: { type: String, required: false },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'El id usuario es un campo obligatorio ']
    }
    
});



module.exports = mongoose.model('Provider', providerSchema);

 	