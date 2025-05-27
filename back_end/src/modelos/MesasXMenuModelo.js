const connection = require('../conexion');
const MesasXMenuModelo = {};

// Obtener todos los registros de mesas por menú
MesasXMenuModelo.getMesasXMenu = function(callback) {
    if (connection) {
        const sql = `
        SELECT  
mm.Id_Mesa,
mm.Id_Menu,
m.Numero_Mesa,
m.Capacidad,
ub.Valor_Catalogo AS Ubicacion,
em.Valor_Catalogo AS Estado_Mesa,
tm.Valor_Catalogo AS Tipo_Mesa,
me.Descripcion,
na.Valor_Catalogo AS Nacionalidad,
po.Valor_Catalogo AS Porciones, 
tp.Valor_Catalogo AS Tipo_Plato,
cp.Valor_Catalogo AS Clase_Plato

FROM mesas_x_menus mm 
LEFT JOIN mesas m ON mm.Id_Mesa = m.Id_Mesa
LEFT JOIN menus me ON mm.Id_Menu = me.Id_Menu
LEFT JOIN catalogo_universal ub ON m.Ubicacion = ub.Id_Catalogo
LEFT JOIN catalogo_universal em ON m.Estado_Mesa = em.Id_Catalogo
LEFT JOIN catalogo_universal tm ON m.Tipo_Mesa = tm.Id_Catalogo
LEFT JOIN catalogo_universal na ON me.Nacionalidad = na.Id_Catalogo
LEFT JOIN catalogo_universal po ON me.Porciones = po.Id_Catalogo
LEFT JOIN catalogo_universal tp ON me.Tipo_Plato = tp.Id_Catalogo
LEFT JOIN catalogo_universal cp ON me.Clase_Plato = cp.Id_Catalogo


ORDER BY Id_Mesa_X_Menu
;`   ;
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
