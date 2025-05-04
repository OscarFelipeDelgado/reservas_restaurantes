const express = require('express');
const router = express.Router();
const MesasModelo = require('../modelos/MesasModelo');

function validarMesa(data, requiereId = false) {
    const errores = [];

    if (requiereId && typeof data.Id_Mesa !== 'number') errores.push("Id_Mesa (número)");
    if (typeof data.Numero_Mesa !== 'number') errores.push("Numero_Mesa (número)");
    if (data.Capacidad !== null && typeof data.Capacidad !== 'number') errores.push("Capacidad (número o null)");
    if (data.Ubicacion !== null && typeof data.Ubicacion !== 'number') errores.push("Ubicacion (número o null)");
    if (data.Estado_Mesa !== null && typeof data.Estado_Mesa !== 'number') errores.push("Estado_Mesa (número o null)");
    if (data.Tipo_Mesa !== null && typeof data.Tipo_Mesa !== 'number') errores.push("Tipo_Mesa (número o null)");
    if (data.Notas !== null && typeof data.Notas !== 'string') errores.push("Notas (texto o null)");

    return errores;
}

module.exports = function () {

    router.get("/", function (req, res) {
        MesasModelo.getMesas(function (error, data) {
            if (data && data.length > 0) res.status(200).json(data);
            else res.status(404).json({ msg: "No hay registros de mesas" });
        });
    });

    router.get("/:id", function (req, res) {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) {
            MesasModelo.getMesaById(id, function (error, data) {
                if (data && data.length > 0) res.status(200).json(data);
                else res.status(404).json({ msg: "Mesa no encontrada" });
            });
        } else {
            res.status(400).json({ msg: "ID inválido (debe ser un número)" });
        }
    });

    router.post("/", function (req, res) {
        const mesaData = {
            Numero_Mesa: req.body.Numero_Mesa,
            Capacidad: req.body.Capacidad,
            Ubicacion: req.body.Ubicacion,
            Estado_Mesa: req.body.Estado_Mesa,
            Tipo_Mesa: req.body.Tipo_Mesa,
            Notas: req.body.Notas
        };

        const errores = validarMesa(mesaData);
        if (errores.length > 0) {
            return res.status(400).json({
                error: "Datos inválidos. Revisa los siguientes campos:",
                campos: errores,
                ejemplo_correcto: {
                    "Numero_Mesa": 10,
                    "Capacidad": 4,
                    "Ubicacion": 2,
                    "Estado_Mesa": 1,
                    "Tipo_Mesa": 3,
                    "Notas": "Mesa cerca de la ventana"
                }
            });
        }

        MesasModelo.insertarMesa(mesaData, function (error, data) {
            if (data) res.status(200).json(data);
            else res.status(500).json({ error: "Error al registrar mesa" });
        });
    });

    router.put("/", function (req, res) {
        const mesaData = {
            Id_Mesa: req.body.Id_Mesa,
            Numero_Mesa: req.body.Numero_Mesa,
            Capacidad: req.body.Capacidad,
            Ubicacion: req.body.Ubicacion,
            Estado_Mesa: req.body.Estado_Mesa,
            Tipo_Mesa: req.body.Tipo_Mesa,
            Notas: req.body.Notas
        };

        const errores = validarMesa(mesaData, true);
        if (errores.length > 0) {
            return res.status(400).json({
                error: "Datos inválidos para actualizar. Revisa los siguientes campos:",
                campos: errores,
                ejemplo_correcto: {
                    "Id_Mesa": 5,
                    "Numero_Mesa": 12,
                    "Capacidad": 6,
                    "Ubicacion": null,
                    "Estado_Mesa": 2,
                    "Tipo_Mesa": 1,
                    "Notas": "Actualizada con nueva ubicación"
                }
            });
        }

        MesasModelo.modificarMesa(mesaData, function (error, data) {
            if (data) res.status(200).json(data);
            else res.status(500).json({ error: "Error al actualizar mesa" });
        });
    });

    router.delete("/:id", function (req, res) {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) {
            MesasModelo.eliminarMesa(id, function (error, data) {
                if (data) res.status(200).json(data);
                else res.status(404).json({ msg: "No se pudo eliminar la mesa" });
            });
        } else {
            res.status(400).json({ msg: "ID inválido (debe ser un número)" });
        }
    });

    return router;
};
