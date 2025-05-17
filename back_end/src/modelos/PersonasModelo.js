const connection = require('../conexion');
const PersonasModelo = {};

// Obtener todas las personas
PersonasModelo.getPersonas = function (callback) {
    if (connection) {
        const sql = `
            SELECT 
                p.Id_Persona,
                td.Valor_Catalogo AS Tipo_Documento,
                p.Num_Documento,
                p.Primer_Nombre,
                p.Segundo_Nombre,
                p.Primer_Apellido,
                p.Segundo_Apellido,
                p.Fecha_Nacimiento,
                ec.Valor_Catalogo AS Estado_Civil,
                ep.Valor_Catalogo AS Eps_Persona
            FROM personas p
            LEFT JOIN catalogo_universal td ON p.Tipo_Documento = td.Id_Catalogo
            LEFT JOIN catalogo_universal ec ON p.Estado_Civil = ec.Id_Catalogo
            LEFT JOIN catalogo_universal ep ON p.Eps_Persona = ep.Id_Catalogo;
        `;
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

// Eliminar persona
PersonasModelo.eliminarPersona = function (id, callback) {
    if (connection) {
        const sql = "DELETE FROM personas WHERE Id_Persona = ?";
        connection.query(sql, [id], (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Persona eliminada correctamente" });
        });
    }
};

// Funciones async para catálogos
PersonasModelo.existeEnCatalogo = async function (idCatalogo, tipoCatalogo) {
    const query = "SELECT 1 FROM catalogo_universal WHERE id_catalogo = ? AND tipo_catalogo = ? LIMIT 1";
    return new Promise((resolve, reject) => {
        connection.query(query, [idCatalogo, tipoCatalogo], (err, results) => {
            if (err) reject(err);
            else resolve(results.length > 0);
        });
    });
};

PersonasModelo.obtenerValoresCatalogo = async function (tipoCatalogo) {
    const query = "SELECT id_catalogo, valor_catalogo FROM catalogo_universal WHERE tipo_catalogo = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [tipoCatalogo], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = { PersonasModelo };
