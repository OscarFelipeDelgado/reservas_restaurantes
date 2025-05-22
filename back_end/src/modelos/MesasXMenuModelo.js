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
            callback(null, rows);
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

// Verificar si la mesa existe (por Id_Mesa)
MesasXMenuModelo.existeMesa = function(idMesa, callback) {
    if (connection) {
        const sql = "SELECT 1 FROM mesas WHERE Id_Mesa = ? LIMIT 1";
        connection.query(sql, [idMesa], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows.length > 0); // true si existe
        });
    }
};

// Verificar si el menú existe (por Id_Menu)
MesasXMenuModelo.existeMenu = function(idMenu, callback) {
    if (connection) {
        const sql = "SELECT 1 FROM menus WHERE Id_Menu = ? LIMIT 1";
        connection.query(sql, [idMenu], (error, rows) => {
            if (error) return callback(error, null);
            callback(null, rows.length > 0); // true si existe
        });
    }
};

module.exports = MesasXMenuModelo;
