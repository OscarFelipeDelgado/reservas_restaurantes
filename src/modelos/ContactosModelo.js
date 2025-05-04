const connection = require('../conexion');
const ContactosModelo = {};

// Obtener todos los contactos
ContactosModelo.getContactos = function (callback) {
    if (connection) {
        const sql = "SELECT * FROM contactos ORDER BY Id_Contacto;";
        connection.query(sql, (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

    // Obtener contacto por ID
    ContactosModelo.getContactosByPersonaId = function (personaId, callback) {
        if (connection) {
            const sql = "SELECT * FROM contactos WHERE Id_Persona = ? ORDER BY Id_Contacto;";
            connection.query(sql, [personaId], (error, rows) => {
                if (error) return callback(error, null);
                callback(null, rows); // Retorna todos los contactos asociados con esa persona
            });
        }
    };



// Insertar nuevo contacto
ContactosModelo.insertarContacto = function (contactoData, callback) {
    if (connection) {
        const sql = "INSERT INTO contactos SET ?";
        connection.query(sql, contactoData, (error, result) => {
            if (error) return callback(error, null);
            callback(null, {
                msg: "Contacto registrado exitosamente",
                insertId: result.insertId
            });
        });
    }
};

// Modificar contacto existente
ContactosModelo.modificarContacto = function (contactoData, callback) {
    if (connection) {
        const sql = `
            UPDATE contactos SET
                Id_Persona = ?,
                Tipo_Contacto = ?,
                Dato_Contacto = ?
            WHERE Id_Contacto = ?
        `;

        const values = [
            contactoData.Id_Persona,
            contactoData.Tipo_Contacto,
            contactoData.Dato_Contacto,
            contactoData.Id_Contacto
        ];

        connection.query(sql, values, (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Contacto actualizado correctamente" });
        });
    }
};

// Eliminar contacto por ID
ContactosModelo.eliminarContacto = function (id, callback) {
    if (connection) {
        const sql = "DELETE FROM contactos WHERE Id_Contacto = ?";
        connection.query(sql, [id], (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Contacto eliminado correctamente" });
        });
    }
};

module.exports = ContactosModelo;
