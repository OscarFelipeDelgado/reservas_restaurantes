const connection = require('../conexion');
const MesasXMenuModelo = {};

// Obtener todos los registros de mesas por menú
MesasXMenuModelo.getMesasXMenu = function(callback) {
    if (connection) {
        const sql = "SELECT * FROM mesas_x_menus ORDER BY Id_Mesa_X_Menu;";
        connection.query(sql, (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);
        });
    }
};

// Obtener mesas por ID de menú
MesasXMenuModelo.getMesasXMenuByMenuId = function(menuId, callback) {
    if (connection) {
        const sql = "SELECT * FROM mesas_x_menus WHERE Id_Menu = ? ORDER BY Id_Mesa_X_Menu;";
        connection.query(sql, [menuId], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows);  // Retorna todas las mesas asociadas con ese menú
        });
    }
};

// Insertar nueva mesa para el menú
MesasXMenuModelo.insertarMesaXMenu = function(mesaData, callback) {
    if (connection) {
        const sql = "INSERT INTO mesas_x_menus SET ?";
        connection.query(sql, mesaData, (error, result) => {
            if (error) return callback(error, null);
            callback(null, {
                msg: "Mesa registrada exitosamente",
                insertId: result.insertId
            });
        });
    }
};

// Modificar mesa existente
MesasXMenuModelo.modificarMesaXMenu = function(mesaData, callback) {
    if (connection) {
        const sql = `
            UPDATE mesas_x_menus SET
                Id_Menu = ?,
                Id_Mesa = ?
            WHERE Id_Mesa_X_Menu = ?
        `;
        const values = [
            mesaData.Id_Menu,
            mesaData.Id_Mesa,
            mesaData.Id_Mesa_X_Menu
        ];

        connection.query(sql, values, (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Mesa actualizada correctamente" });
        });
    }
};

// Eliminar mesa por ID
MesasXMenuModelo.eliminarMesaXMenu = function(id, callback) {
    if (connection) {
        const sql = "DELETE FROM mesas_x_menus WHERE Id_Mesa_X_Menu = ?";
        connection.query(sql, [id], (error, result) => {
            if (error) return callback(error, null);
            callback(null, { msg: "Mesa eliminada correctamente" });
        });
    }
};

module.exports = MesasXMenuModelo;
