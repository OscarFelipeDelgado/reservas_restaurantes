const connection = require('../conexion');

var InformesModelo = {};

// ... 

InformesModelo.getInformeReservas = function ({ fecha_inicio, fecha_fin, nombre, apellido }, callback) {
    if (connection) {
        let sql = `
            SELECT 
                r.Id_Reserva,
                r.Fecha_Reserva,
                r.Hora_Reserva,
                r.Cantidad_Personas,
                er.Valor_Catalogo AS Estado_Reserva,
                mp.Valor_Catalogo AS Metodo_Pago,
                r.Notas,
                p.Primer_Nombre,
                p.Segundo_Nombre,
                p.Primer_Apellido,
                p.Segundo_Apellido
            FROM reservas r
            JOIN personas p ON r.Id_Cliente = p.Id_Persona
            LEFT JOIN catalogo_universal er ON r.Estado_Reserva = er.Id_Catalogo
            LEFT JOIN catalogo_universal mp ON r.Metodo_Pago = mp.Id_Catalogo
            WHERE r.Fecha_Reserva BETWEEN ? AND ?
        `;

        const valores = [fecha_inicio, fecha_fin];

        if (nombre) {
            sql += ` AND (p.Primer_Nombre LIKE ? OR p.Segundo_Nombre LIKE ?)`;
            valores.push(`%${nombre}%`, `%${nombre}%`);
        }

        if (apellido) {
            sql += ` AND (p.Primer_Apellido LIKE ? OR p.Segundo_Apellido LIKE ?)`;
            valores.push(`%${apellido}%`, `%${apellido}%`);
        }

        sql += ` ORDER BY r.Fecha_Reserva DESC`;

        connection.query(sql, valores, function (error, rows) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, rows);
            }
        });
    }
};

module.exports = InformesModelo;
