var mongoose = require('mongoose');
const provider = require('./provider');
var Schema = mongoose.Schema;


var docSchema = new Schema({
    
    titulo: { type: String, required: [true, 'El Titulo es necesario'] },
    descripcion: {type: String},
    image: { type: String },
    sfile: {type: String },
    image_type: {type: String},
    provider: {
        type: Schema.Types.ObjectId, ref: 'Provider',
        required: [true, 'El id provider es un campo obligatorio ']
    }

        
});



module.exports = mongoose.model('Doc', docSchema);