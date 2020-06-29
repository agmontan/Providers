// Requires

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

// Inicializar variables

var app = express();

//cors

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Body Parser

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

// Importar rutas

var appRoutes = require('./routes/appRoute');
var userRoutes = require('./routes/userRoute');
var loginRoutes = require('./routes/loginRoute');
var providersRoutes = require('./routes/provider');
var locationRoutes = require('./routes/location');
var docRoutes = require('./routes/doc');
var uploadRoutes = require('./routes/uploadRoute');
var imageRoutes = require('./routes/imageRoute');
var uploadFileRoutes = require('./routes/uploadFileRoute');
var fileRoutes = require('./routes/fileRoute');



//conexion a la base de datos
mongoose.set('useCreateIndex', true);
mongoose.connection.openUri('mongodb://localhost:27017/provider', { useNewUrlParser: true,  useUnifiedTopology: true }, (err, res) => {
    if(err) throw err;
    console.log('Base de datos mongo: \x1b[32m%s\x1b[0m','online');
});



// Rutas
app.use('/user', userRoutes);
app.use('/login', loginRoutes);
app.use('/provider',providersRoutes);
app.use('/location',locationRoutes);
app.use('/doc', docRoutes);
app.use('/upload', uploadRoutes);
app.use('/image', imageRoutes);
app.use('/uploadfile', uploadFileRoutes);
app.use('/file', fileRoutes);


app.use('/', express.static('client', {redirect: false}));
app.get('*', function(req, res, next) {
    res.sendFile(path.resolve('client/index.html'));
});

// escuchar peticiones

app.listen(3500, () => {
    console.log('express server corriendo en el puerto 3500: \x1b[32m%s\x1b[0m','online');
});
