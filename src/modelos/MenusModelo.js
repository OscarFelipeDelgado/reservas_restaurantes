const connection = require('../conexion');

var MenusModelo = {};

// Obtener todos los menús
MenusModelo.getMenus = function (callback) {
    if (connection) {
        var sql = "SELECT * FROM menus ORDER BY Id_Menu;";
        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

// Obtener menú por ID
MenusModelo.getMenuById = function (idMenu, callback) {
    if (connection) {
        var sql = "SELECT * FROM menus WHERE Id_Menu = " + connection.escape(idMenu) + ";";
        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, rows);
            }
        });
    }
}

// Insertar nuevo menú
MenusModelo.insertarMenu = function (menuData, callback) {
    if (connection) {
        var sql = "INSERT INTO menus SET ?";
        connection.query(sql, menuData, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "¡Menú registrado con éxito!" });
            }
        });
    }
}

// Modificar menú existente
MenusModelo.modificarMenu = function (menuData, callback) {
    if (connection) {
        var sql = "UPDATE menus SET " +
            "Descripcion = " + connection.escape(menuData.Descripcion) + ", " +
            "Nacionalidad = " + connection.escape(menuData.Nacionalidad) + ", " +
            "Porciones = " + connection.escape(menuData.Porciones) + ", " +
            "Tipo_Plato = " + connection.escape(menuData.Tipo_Plato) + ", " +
            "Clase_Plato = " + connection.escape(menuData.Clase_Plato) +
            " WHERE Id_Menu = " + connection.escape(menuData.Id_Menu) + ";";

        connection.query(sql, function (error, result) {
            if (error) {
                throw error;
            } else {
                callback(null, { "msg": "¡Menú actualizado con éxito!" });
            }
        });
    }
}

module.exports = MenusModelo;