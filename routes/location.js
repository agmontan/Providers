var express = require('express');



var app = express();

var Location = require('../models/location');

// ==========================================
// Obtener todos los locations
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Location.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, locations) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando location',
                        errors: err
                    });
                }

                Location.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        locations: locations,
                        total: conteo
                    });

                })

            });
});
// ==========================================
// Obtener una Location
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Location.findById(id)
    .exec((err,location)=>{
        if(err){
             return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando locacion',
                        errors: err
        });
        }
        if(!location){
           return res.status(400).json({
                ok: false,
                mensaje: 'La locacion con el id ' + id + ' no existe',
                errors: { message: 'No existe una locacion con ese ID' }
            }); 
        }
        res.status(200).json({
            ok: true,
            location: location
            });
    })
})


// ==========================================
// Actualizar Location
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Location.findById(id, (err, location) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar location',
                errors: err
            });
        }

        if (!location) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El location con el id ' + id + ' no existe',
                errors: { message: 'No existe un location con ese ID' }
            });
        }


        location.ciudad = body.ciudad;
        location.direccion = body.direccion;
        location.telefono = body.telefono;
        location.nombre_contacto = body.nombre_contacto;
        location.email = body.email;
        location.celular = body.celular;
        location.user = req.user._id;
        location.provider = body.provider;

        location.save((err, locationSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar location',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                location: locationSaved
            });

        });

    });

});



// ==========================================
// Crear un nuevo location
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    var location = new Location({
        ciudad: body.ciudad,
        direccion: body.direccion,
        telefono: body.telefono,
        nombre_contacto: body.nombre_contacto,
        email: body.email,
        celular: body.celular,
        
        provider: body.provider
    });

    location.save((err, locationSaved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear location',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            location: locationSaved
        });


    });

});


// ============================================
//   Borrar un location por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Location.findByIdAndRemove(id, (err, locationDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar location',
                errors: err
            });
        }

        if (!locationDeleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un location con ese id',
                errors: { message: 'No existe un location con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            location: locationDeleted
        });

    });

});


module.exports = app;