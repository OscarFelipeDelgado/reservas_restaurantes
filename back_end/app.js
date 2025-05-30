
var express = require('express'); //guarda express que nosotros intalamos
var bodyParser = require('body-parser'), port = 3000; //rmanejo de cuerpo de la "pagina" y puerto
var http = require('http'); //protocolo de intercambio de archivos
var path = require('path'); //direccion

const cors = require('cors');




var conectado = require('./src/conexion/index');

const CatalogoUniversalModelo = require('./src/modelos/CataUniversalModelo')
var CataUnivRuta = require('./src/rutas/CataUniversalRuta');

const PersonasModelo = require('./src/modelos/PersonasModelo');
var PersonasRuta = require('./src/rutas/PersonasRuta');

var ReservaModeloRutas = require('./src/rutas/ReservasRuta')

var MenusModeloRutas = require('./src/rutas/MenusRutas')

const ContactosModelo = require('./src/modelos/ContactosModelo');
var ContactosRuta = require('./src/rutas/ContactosRuta');

//const MesasXMenuModelo = require('../modelos/MesasXMenuModelo');
var MesasXMenuRuta = require('./src/rutas/MesasXMenuRuta');

const MesasModelo = require('./src/modelos/MesasModelo');
var MesasRuta = require('./src/rutas/MesasRuta');

const InformesRuta = require('./src/rutas/InformesRuta');

//var tipdoc = require('./src/Rutas/tipdocruta');//ruta

var app = express(); //recibe un constructor

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// todos los entornos
app.set('port', process.env.PORT || port); //metodo para recibir puerto y proceso
app.use(bodyParser.json({type: 'application/json', limit: '10mb'})); //recibe un cuerpo y un objeto json
app.use(bodyParser.urlencoded({extended: false})); //recibe url codificada
app.use(express.static(path.join(__dirname, 'public'))); //recibe direccion


//================================================================
app.use(function (req, res, next)
{
    // Sitio web al que desea permitir que se conecte
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // A que métodos que desea dar permisos
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // A que encabezados se les va a dar permiso
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Establezca en verdadero si necesita que el sitio web incluya cookies en las solicitudes enviadas

    //a la API (por ejemplo, en caso de que use sesiones)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pase a la siguiente capa de middleware
    next();
});
    
app.use('/CataUniversal', CataUnivRuta());
app.use('/Personas', PersonasRuta());
app.use('/Reservas', ReservaModeloRutas());
app.use('/Menus', MenusModeloRutas());
app.use('/Mesas', MesasRuta());
app.use('/Contactos', ContactosRuta());
app.use('/MesasXMenu', MesasXMenuRuta());
app.use('/Informes', InformesRuta);
//============================================================
//app.use('/tipdoc', tipdoc());//ruta para el servicio


http.createServer(app).listen(app.get('port'), function ( )
{
    console.log('Servidor Express escuchando por el puerto ' + app.get('port'));
});

//Prueba para hacer get desde el navegador
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

module.exports = app;