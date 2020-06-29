var express = require('express');



var app = express();

var Provider = require('../models/provider');

// ==========================================
// Obtener todos los providers
// ==========================================
app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Provider.find({})
        .skip(desde)
        .limit(5)
        .exec(
            (err, providers) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando provider',
                        errors: err
                    });
                }

                Provider.count({}, (err, conteo) => {

                    res.status(200).json({
                        ok: true,
                        providers: providers,
                        total: conteo
                    });
                })

            });
});
// ==========================================
// Obtener un Proveedor
// ==========================================
app.get('/:id', (req, res) => {
    var id = req.params.id;
    Provider.findById(id)
    .exec((err,provider)=>{
        if(err){
             return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando proveedor',
                        errors: err
        });
        }
        if(!provider){
           return res.status(400).json({
                ok: false,
                mensaje: 'El adquisicion con el id ' + id + ' no existe',
                errors: { message: 'No existe un acquisition con ese ID' }
            }); 
        }
        res.status(200).json({
            ok: true,
            provider: provider
            });
    })
})


// ==========================================
// Actualizar Provider
// ==========================================
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Provider.findById(id, (err, provider) => {


        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar provider',
                errors: err
            });
        }

        if (!provider) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El provider con el id ' + id + ' no existe',
                errors: { message: 'No existe un provider con ese ID' }
            });
        }


        provider.razon_social = body.razon_social;
        provider.nombre_comercial = body.razon_social;
        provider.nombre_representante = body.nombre_representante;
        provider.ci_exp = body.ci_exp;
        provider.email = body.email;
        provider.proveedor_de = body.proveedor_de;
        provider.rubro = body.rubro;
        provider.tipo = body.tipo;
        provider.nit = body.nit;
        provider.pagina_web = body.pagina_web;
        provider.pais=body.pais;

       

        provider.save((err, providerSaved) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar provider',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                provider: providerSaved
            });

        });

    });

});



// ==========================================
// Crear un nuevo provider
// ==========================================
app.post('/',  (req, res) => {

    var body = req.body;

    var provider = new Provider({
        razon_social: body.razon_social,
        nombre_comercial: body.razon_social,
        nombre_representante: body.nombre_representante,
        ci_exp: body.ci_exp,
        email: body.email,
        proveedor_de: body.proveedor_de,
        rubro: body.rubro,
        tipo: body.tipo,
        nit: body.nit,
        pagina_web: body.pagina_web,
        pais: body.pais,

        
    });

    provider.save((err, providerSaved) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear provider',
                errors: err
            });
        }

        res.status(201).json({
            ok: true,
            provider: providerSaved
        });


    });

});


// ============================================
//   Borrar un provider por el id
// ============================================
app.delete('/:id', (req, res) => {

    var id = req.params.id;

    Provider.findByIdAndRemove(id, (err, providerDeleted) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar provider',
                errors: err
            });
        }

        if (!providerDeleted) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un provider con ese id',
                errors: { message: 'No existe un provider con ese id' }
            });
        }

        res.status(200).json({
            ok: true,
            provider: providerDeleted
        });

    });

});


module.exports = app;