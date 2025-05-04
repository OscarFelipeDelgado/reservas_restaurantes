const express = require('express');
const router = express.Router();

var ReservasModelo = require('../modelos/ReservasModelo');

module.exports = function() {
// Obtener todas las reservas
router.get('/', function (req, res) {
    ReservasModelo.getReservas(function (error, data) {
        if (error) {
            res.status(500).json({ error: 'Error al obtener las reservas' });
        } else {
            res.json(data);
        }
    });
});

// Obtener reserva por ID
router.get('/:id', function (req, res) {
    const id = req.params.id;

    ReservasModelo.getReservaById(id, function (error, data) {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la reserva' });
        } else {
            res.json(data);
        }
    });
});

// Insertar nueva reserva
router.post('/', function (req, res) {
    const reservaData = {
        Id_Reserva: null,
        Id_Cliente: req.body.Id_Cliente, 
        Id_Menu_X_Mesa: req.body.Id_Menu_X_Mesa, 
        Fecha_Reserva: req.body.Fecha_Reserva, 
        Hora_Reserva: req.body.Hora_Reserva, 
        Cantidad_Personas: req.body.Cantidad_Personas, 
        Estado_Reserva: req.body.Estado_Reserva, 
        Metodo_Pago : req.body.Metodo_Pago
    }

    ReservasModelo.insertarReserva(reservaData, function (error, resultado) {
        if (error) {
            res.status(500).json({ error: 'Error al registrar la reserva' });
        } else {
            res.json(resultado);
        }
    });
});

// Modificar reserva existente
router.put('/', function (req, res) {
        const reservaData = {
            Id_Reserva: req.body.Id_Reserva,
            Fecha_Reserva: req.body.Fecha_Reserva, 
            Hora_Reserva: req.body.Hora_Reserva, 
            Cantidad_Personas: req.body.Cantidad_Personas, 
            Notas: req.body.Notas
    }

    ReservasModelo.modificarReserva(reservaData, function (error, resultado) {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar la reserva' });
        } else {
            res.json(resultado);
        }
    });
});
return router
}