const express = require('express');
const router = express.Router();

var MenusModelo = require('../modelos/MenusModelo');

// Lista de nacionalidades válidas
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

// Lista de porciones válidas
const porcionesValidas = {
    1101: "Individual",
    1102: "Para compartir",
    1103: "Familiar"
};

// Lista de tipos de plato válidos
const tiposPlatoValidos = {
    901: "Entrada",
    902: "Plato Fuerte",
    903: "Postre",
    904: "Bebida",
    905: "Acompañamiento",
    906: "Sopa"
};

// Lista de clases de plato válidas
const clasesPlatoValidas = {
    1001: "Vegetariano",
    1002: "Vegano",
    1003: "Sin gluten",
    1004: "Sin lactosa",
    1005: "Kosher",
    1006: "Halal",
    1007: "Estándar"
};

// Función para validar nacionalidad
function validarNacionalidad(nacionalidad) {
    return nacionalidadesValidas.hasOwnProperty(nacionalidad);
}

// Función para validar porciones
function validarPorciones(porciones) {
    return porcionesValidas.hasOwnProperty(porciones);
}

// Función para validar tipo de plato
function validarTipoPlato(tipoPlato) {
    return tiposPlatoValidos.hasOwnProperty(tipoPlato);
}

// Función para validar clase de plato
function validarClasePlato(clasePlato) {
    return clasesPlatoValidas.hasOwnProperty(clasePlato);
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

    // Insertar nuevo menú con validación
    router.post('/', function (req, res) {
        const nacionalidad = parseInt(req.body.Nacionalidad);
        const porciones = parseInt(req.body.Porciones);
        const tipoPlato = parseInt(req.body.Tipo_Plato);
        const clasePlato = parseInt(req.body.Clase_Plato);

        // Validar nacionalidad
        if (!validarNacionalidad(nacionalidad)) {
            return res.status(400).json({
                error: "Nacionalidad inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: nacionalidadesValidas
            });
        }

        // Validar porciones
        if (!validarPorciones(porciones)) {
            return res.status(400).json({
                error: "Porciones inválidas. Debe ser uno de los siguientes códigos:",
                codigos_validos: porcionesValidas
            });
        }

        // Validar tipo de plato
        if (!validarTipoPlato(tipoPlato)) {
            return res.status(400).json({
                error: "Tipo de plato inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: tiposPlatoValidos
            });
        }

        // Validar clase de plato
        if (!validarClasePlato(clasePlato)) {
            return res.status(400).json({
                error: "Clase de plato inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: clasesPlatoValidas
            });
        }

        const menuData = {
            Id_Menu: null,
            Descripcion: req.body.Descripcion,
            Nacionalidad: nacionalidad,
            Porciones: porciones,
            Tipo_Plato: tipoPlato,
            Clase_Plato: clasePlato
        }

        MenusModelo.insertarMenu(menuData, function (error, resultado) {
            if (error) {
                res.status(500).json({ error: 'Error al registrar el menú' });
            } else {
                res.json(resultado);
            }
        });
    });

    // Modificar menú existente con validación
    router.put('/', function (req, res) {
        const nacionalidad = parseInt(req.body.Nacionalidad);
        const porciones = parseInt(req.body.Porciones);
        const tipoPlato = parseInt(req.body.Tipo_Plato);
        const clasePlato = parseInt(req.body.Clase_Plato);

        // Validar nacionalidad
        if (!validarNacionalidad(nacionalidad)) {
            return res.status(400).json({
                error: "Nacionalidad inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: nacionalidadesValidas
            });
        }

        // Validar porciones
        if (!validarPorciones(porciones)) {
            return res.status(400).json({
                error: "Porciones inválidas. Debe ser uno de los siguientes códigos:",
                codigos_validos: porcionesValidas
            });
        }

        // Validar tipo de plato
        if (!validarTipoPlato(tipoPlato)) {
            return res.status(400).json({
                error: "Tipo de plato inválido. Debe ser uno de los siguientes códigos:",
                codigos_validos: tiposPlatoValidos
            });
        }

        // Validar clase de plato
        if (!validarClasePlato(clasePlato)) {
            return res.status(400).json({
                error: "Clase de plato inválida. Debe ser uno de los siguientes códigos:",
                codigos_validos: clasesPlatoValidas
            });
        }

        const menuData = {
            Id_Menu: req.body.Id_Menu,
            Descripcion: req.body.Descripcion,
            Nacionalidad: nacionalidad,
            Porciones: porciones,
            Tipo_Plato: tipoPlato,
            Clase_Plato: clasePlato
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
