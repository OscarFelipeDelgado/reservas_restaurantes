const express = require('express');
const router = express.Router();

var MenusModelo = require('../modelos/MenusModelo');

// Lista de nacionalidades válidas según tu catálogo universal (tipo 14)
const nacionalidadesValidas = {
    1401: "Italiana",
    1402: "Mexicana",
    1403: "Japonesa",
    1404: "Colombiana",
    1405: "Francesa",
    1406: "China",
    1407: "Mediterránea",
    1408: "Internacional"
};

// Función para validar la nacionalidad
function validarNacionalidad(nacionalidad) {
    return nacionalidadesValidas.hasOwnProperty(nacionalidad);
}

// Mostrar lista válida
function listaNacionalidades() {
    let lista = "";
    for (const [codigo, nombre] of Object.entries(nacionalidadesValidas)) {
        lista += `${codigo} - ${nombre}\n`;
    }
    return lista;
}

module.exports = function () {

    // Obtener todos los menús
    router.get('/', function (req, res) {
        MenusModelo.getMenus(function (error, data) {
            if (error) {
                res.status(500).json({ error: 'Error al obtener los menús' });
            } else {
                res.json(data);
            }
        });
    });

    // Obtener menú por ID
    router.get('/:id', function (req, res) {
        const id = req.params.id;
        MenusModelo.getMenuById(id, function (error, data) {
            if (error) {
                res.status(500).json({ error: 'Error al obtener el menú' });
            } else {
                res.json(data);
            }
        });
    });

    // Insertar nuevo menú con validación de nacionalidad
    router.post('/', function (req, res) {
        const nacionalidad = parseInt(req.body.Nacionalidad);

        // Validar nacionalidad
        if (!validarNacionalidad(nacionalidad)) {
            return res.status(400).json({
                error: "Nacionalidad inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: nacionalidadesValidas
            });
        }

        const menuData = {
            Id_Menu: null,
            Descripcion: req.body.Descripcion,
            Nacionalidad: nacionalidad,
            Porciones: req.body.Porciones,
            Tipo_Plato: req.body.Tipo_Plato,
            Clase_Plato: req.body.Clase_Plato
        }

        MenusModelo.insertarMenu(menuData, function (error, resultado) {
            if (error) {
                res.status(500).json({ error: 'Error al registrar el menú' });
            } else {
                res.json(resultado);
            }
        });
    });

    // Modificar menú existente con validación de nacionalidad
    router.put('/', function (req, res) {
        const nacionalidad = parseInt(req.body.Nacionalidad);

        // Validar nacionalidad
        if (!validarNacionalidad(nacionalidad)) {
            return res.status(400).json({
                error: "Nacionalidad inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: nacionalidadesValidas
            });
        }

        const menuData = {
            Id_Menu: req.body.Id_Menu,
            Descripcion: req.body.Descripcion,
            Nacionalidad: nacionalidad,
            Porciones: req.body.Porciones,
            Tipo_Plato: req.body.Tipo_Plato,
            Clase_Plato: req.body.Clase_Plato
        }

        MenusModelo.modificarMenu(menuData, function (error, resultado) {
            if (error) {
                res.status(500).json({ error: 'Error al actualizar el menú' });
            } else {
                res.json(resultado);
            }
        });
    });

    return router;
}
