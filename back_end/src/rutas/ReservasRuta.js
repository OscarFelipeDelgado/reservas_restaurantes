const express = require('express'); 
const router = express.Router();

var ReservasModelo = require('../modelos/ReservasModelo');

// Estados válidos para la reserva
const estadosReservaValidos = {
    1201: "Pendiente",
    1202: "Confirmada",
    1203: "Cancelada",
    1204: "Completada",
    1205: "No presentado"
};

// Métodos de pago válidos
const metodosPagoValidos = {
    1301: "Efectivo",
    1302: "Tarjeta Crédito",
    1303: "Tarjeta Débito",
    1304: "Transferencia",
    1305: "Cheque",
    1306: "App Móvil"
};

// Función para validar estado de reserva
function validarEstadoReserva(estado) {
    return estadosReservaValidos.hasOwnProperty(estado);
}

// Función para validar método de pago
function validarMetodoPago(metodo) {
    return metodosPagoValidos.hasOwnProperty(metodo);
}

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

    // Obtener reserva por ID JOIN
    router.get('/Join/:idReserva', function (req, res) {
        const idReserva = req.params.idReserva;

        ReservasModelo.getReservaByIdJoin(idReserva, function (error, data) {
            if (error) {
                res.status(500).json({ error: 'Error al obtener la reserva' });
            } else {
                res.json(data);
            }
        });
    });

    // Insertar nueva reserva
    router.post('/', function (req, res) {
        const estadoReserva = parseInt(req.body.Estado_Reserva);
        const metodoPago = parseInt(req.body.Metodo_Pago);

        // Validar estado de reserva
        if (!validarEstadoReserva(estadoReserva)) {
            return res.status(400).json({
                error: "Estado de reserva inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: estadosReservaValidos
            });
        }

        // Validar método de pago
        if (!validarMetodoPago(metodoPago)) {
            return res.status(400).json({
                error: "Método de pago inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: metodosPagoValidos
            });
        }

        const reservaData = {
            Id_Reserva: null,
            Id_Cliente: req.body.Id_Cliente, 
            Id_Menu_X_Mesa: req.body.Id_Menu_X_Mesa, 
            Fecha_Reserva: req.body.Fecha_Reserva, 
            Hora_Reserva: req.body.Hora_Reserva, 
            Cantidad_Personas: req.body.Cantidad_Personas, 
            Estado_Reserva: estadoReserva, 
            Metodo_Pago: metodoPago,
            Notas: req.body.Notas
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
        const estadoReserva = parseInt(req.body.Estado_Reserva);
        const metodoPago = parseInt(req.body.Metodo_Pago);

        // Validar estado de reserva
        if (!validarEstadoReserva(estadoReserva)) {
            return res.status(400).json({
                error: "Estado de reserva inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: estadosReservaValidos
            });
        }

        // Validar método de pago
        if (!validarMetodoPago(metodoPago)) {
            return res.status(400).json({
                error: "Método de pago inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: metodosPagoValidos
            });
        }

        const reservaData = {
            Id_Reserva: req.body.Id_Reserva,
            Fecha_Reserva: req.body.Fecha_Reserva, 
            Hora_Reserva: req.body.Hora_Reserva, 
            Cantidad_Personas: req.body.Cantidad_Personas, 
            Estado_Reserva: estadoReserva,
            Metodo_Pago: metodoPago,
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

    return router;
}
