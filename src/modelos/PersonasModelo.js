const connection = require('../conexion');
const PersonasModelo = {};

// Obtener todas las personas
PersonasModelo.getPersonas = function (callback) {
    if (connection) {
        const sql = "SELECT * FROM personas ORDER BY Primer_Nombre;";
        connection.query(sql, (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

// Obtener una persona por ID
PersonasModelo.getPersonaById = function (id, callback) {
    if (connection) {
        const sql = "SELECT * FROM personas WHERE Id_Persona = ?";
        connection.query(sql, [id], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

// Insertar nueva persona
PersonasModelo.insertarPersona = function (personaData, callback) {
    if (connection) {
        const sql = "INSERT INTO personas SET ?";
        connection.query(sql, personaData, (error, result) => {
            if (error) return callback(error, null);
            callback(null, {
                msg: "Persona registrada exitosamente",
                insertId: result.insertId
            });
        });
    }
};

// Modificar persona existente
PersonasModelo.modificarPersona = function (personaData, callback) {
    if (connection) {
        const sql = `
            UPDATE personas SET
                Tipo_Documento = ?,
                Num_Documento = ?,
                Primer_Nombre = ?,
                Segundo_Nombre = ?,
                Primer_Apellido = ?,
                Segundo_Apellido = ?,
                Fecha_Nacimiento = ?,
                Estado_Civil = ?,
                Eps_Persona = ?
            WHERE Id_Persona = ?
        `;

        const values = [
            personaData.Tipo_Documento,
            personaData.Num_Documento,
            personaData.Primer_Nombre,
            personaData.Segundo_Nombre,
            personaData.Primer_Apellido,
            personaData.Segundo_Apellido,
            personaData.Fecha_Nacimiento,
            personaData.Estado_Civil,
            personaData.Eps_Persona,
            personaData.Id_Persona
        ];

        connection.query(sql, values, (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Persona actualizada correctamente" });
        });
    }
};

// Eliminar persona por ID
PersonasModelo.eliminarPersona = function (id, callback) {
    if (connection) {
        const sql = "DELETE FROM personas WHERE Id_Persona = ?";
        connection.query(sql, [id], (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Persona eliminada correctamente" });
        });
    }
};

module.exports = PersonasModelo;
