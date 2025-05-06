const connection = require('../conexion');
const MesasModelo = {};

// Obtener todas las mesas
MesasModelo.getMesas = function (callback) {
    if (connection) {
        const sql = `
            SELECT 
                m.Id_Mesa, 
                m.Numero_Mesa, 
                m.Capacidad, 
                u.Valor_Catalogo AS Ubicacion, 
                em.Valor_Catalogo AS Estado_Mesa, 
                tm.Valor_Catalogo AS Tipo_Mesa, 
                Notas 
            FROM mesas m
            LEFT JOIN catalogo_universal u ON u.Id_Catalogo = m.Ubicacion
            LEFT JOIN catalogo_universal em ON em.Id_Catalogo = m.Estado_Mesa
            LEFT JOIN catalogo_universal tm ON tm.Id_Catalogo = m.Tipo_Mesa
            ORDER BY Id_Mesa ASC
        `;
        connection.query(sql, (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

// Obtener una mesa por ID
MesasModelo.getMesaById = function (id, callback) {
    if (connection) {
        const sql = "SELECT * FROM mesas WHERE Id_Mesa = ?";
        connection.query(sql, [id], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

// Insertar nueva mesa
MesasModelo.insertarMesa = function (mesaData, callback) {
    if (connection) {
        const sql = "INSERT INTO mesas SET ?";
        connection.query(sql, mesaData, (error, result) => {
            if (error) return callback(error, null);
            callback(null, {
                msg: "Mesa registrada exitosamente",
                insertId: result.insertId
            });
        });
    }
};

// Modificar mesa existente (sin cambiar Id_Mesa)
MesasModelo.modificarMesa = function (mesaData, callback) {
    if (connection) {
        const sql = `
            UPDATE mesas SET
                Numero_Mesa = ?,
                Capacidad = ?,
                Ubicacion = ?,
                Estado_Mesa = ?,
                Tipo_Mesa = ?,
                Notas = ?
            WHERE Id_Mesa = ?
        `;
        const values = [
            mesaData.Numero_Mesa,
            mesaData.Capacidad,
            mesaData.Ubicacion,
            mesaData.Estado_Mesa,
            mesaData.Tipo_Mesa,
            mesaData.Notas,
            mesaData.Id_Mesa
        ];

        connection.query(sql, values, (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Mesa actualizada correctamente" });
        });
    }
};

// Eliminar mesa por ID
MesasModelo.eliminarMesa = function (id, callback) {
    if (connection) {
        const sql = "DELETE FROM mesas WHERE Id_Mesa = ?";
        connection.query(sql, [id], (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Mesa eliminada correctamente" });
        });
    }
};

// Obtener valores de catálogo por tipo
MesasModelo.obtenerValoresCatalogo = async function (tipoCatalogo) {
    const query = "SELECT id_catalogo, valor_catalogo FROM catalogo_universal WHERE tipo_catalogo = ?";
    return new Promise((resolve, reject) => {
        connection.query(query, [tipoCatalogo], (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

module.exports = MesasModelo;
