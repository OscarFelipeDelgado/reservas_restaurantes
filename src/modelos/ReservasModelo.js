const connection = require('../conexion');

var ReservasModelo = {};

// Obtener todas las reservas
ReservasModelo.getReservas = function (callback) {
    if (connection) {
        var sql = "SELECT * FROM reservas ORDER BY Fecha_Reserva ;";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

// Obtener una reserva por ID
ReservasModelo.getReservaById = function (idReserva, callback) {
    if (connection) {
        var sql = "SELECT * FROM reservas WHERE Id_Reserva = " + connection.escape(idReserva) + ";";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}
// Insertar nueva reserva
ReservasModelo.insertarReserva = function (reservaData, callback) {
    if (connection) {
        var sql = "INSERT INTO reservas SET ?";

        connection.query(sql, reservaData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "¡Reserva registrada con éxito!" });
            }
        });
    }
}

// Modificar reserva existente
ReservasModelo.modificarReserva = function (reservaData, callback) {
    if (connection) {
        var sql = "UPDATE reservas SET " +
            "Cantidad_Personas = " + connection.escape(reservaData.Cantidad_Personas) + ", " +
            "Fecha_Reserva = " + connection.escape(reservaData.Fecha_Reserva) + ", " +
            "Hora_Reserva = " + connection.escape(reservaData.Hora_Reserva) + ", " +
            "Notas = " + connection.escape(reservaData.Notas) +
            " WHERE Id_Reserva = " + connection.escape(reservaData.Id_Reserva) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "¡Reserva actualizada con éxito!" });
            }
        });
    }
}

module.exports = ReservasModelo;