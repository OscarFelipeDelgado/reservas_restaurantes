const connection = require('../conexion');

var ReservasModelo = {};

// Obtener todas las reservas
ReservasModelo.getReservas = function (callback) {
    if (connection) {
        var sql = `
SELECT 
    r.Id_Reserva, 
    r.Id_Cliente, 
    c.Primer_Nombre, 
    c.Segundo_Nombre,
    c.Primer_Apellido,
    c.Segundo_Apellido,
    tp.Valor_Catalogo AS Tipo_Documento,
    c.Num_Documento,
    r.Id_Menu_X_Mesa, 
    r.Fecha_Reserva, 
    r.Hora_Reserva, 
    r.Cantidad_Personas, 
    er.Valor_Catalogo AS Estado_Reserva, 
    mp.Valor_Catalogo AS Metodo_Pago, 
    r.Notas 
FROM reservas r
LEFT JOIN personas c ON r.Id_Cliente = c.Id_Persona
LEFT JOIN catalogo_universal er ON r.Estado_Reserva = er.Id_Catalogo
LEFT JOIN catalogo_universal mp ON r.Metodo_Pago = mp.Id_Catalogo
LEFT JOIN catalogo_universal tp ON c.Tipo_Documento = tp.Id_Catalogo
ORDER BY r.Fecha_Reserva DESC;`
;

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
ReservasModelo.getReservaByIdJoin = function (idReserva, callback) {
    if (connection) {
        var sql = `
        SELECT 
            r.Id_Reserva, 
            r.Id_Cliente, 
            r.Id_Menu_X_Mesa, 
            r.Fecha_Reserva, 
            r.Hora_Reserva, 
            r.Cantidad_Personas, 
            er.Valor_Catalogo AS Estado_Reserva, 
            mp.Valor_Catalogo AS Metodo_Pago, 
            r.Notas 
                
        FROM reservas r 

        LEFT JOIN catalogo_universal er ON r.Estado_Reserva = er.Id_Catalogo
        LEFT JOIN catalogo_universal mp ON r.Metodo_Pago = mp.Id_Catalogo

        WHERE Id_Reserva = ${connection.escape(idReserva)}

        ORDER BY Fecha_Reserva DESC;
        `; + connection.escape(idReserva) + ";";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

ReservasModelo.getReservaById = function (id, callback) {
    if (connection) {
        const sql = "SELECT * FROM reservas WHERE Id_Reserva = ?";
        connection.query(sql, [id], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

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