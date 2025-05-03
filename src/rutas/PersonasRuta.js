const express = require('express');
const router = express.Router();
const PersonasModelo = require('../modelos/PersonasModelo');

function validarPersona(data, requiereId = false) {
    const errores = [];

    if (requiereId && (typeof data.Id_Persona !== 'number')) errores.push("Id_Persona (número)");
    if (typeof data.Tipo_Documento !== 'number') errores.push("Tipo_Documento (número)");
    if (typeof data.Num_Documento !== 'string') errores.push("Num_Documento (texto)");
    if (typeof data.Primer_Nombre !== 'string') errores.push("Primer_Nombre (texto)");
    if (data.Segundo_Nombre !== null && typeof data.Segundo_Nombre !== 'string') errores.push("Segundo_Nombre (texto o null)");
    if (typeof data.Primer_Apellido !== 'string') errores.push("Primer_Apellido (texto)");
    if (data.Segundo_Apellido !== null && typeof data.Segundo_Apellido !== 'string') errores.push("Segundo_Apellido (texto o null)");
    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.Fecha_Nacimiento)) errores.push("Fecha_Nacimiento (YYYY-MM-DD)");
    if (data.Estado_Civil !== null && typeof data.Estado_Civil !== 'number') errores.push("Estado_Civil (número o null)");
    if (typeof data.Eps_Persona !== 'number') errores.push("Eps_Persona (número)");

    return errores;
}

module.exports = function () {

    // GET todas las personas
    router.get("/", function (req, res) {
        PersonasModelo.getPersonas(function (error, data) {
            if (data && data.length > 0) res.status(200).json(data);
            else res.status(404).json({ msg: "No hay registros de personas" });
        });
    });

    // GET persona por ID
    router.get("/:id", function (req, res) {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) {
            PersonasModelo.getPersonaById(id, function (error, data) {
                if (data && data.length > 0) res.status(200).json(data);
                else res.status(404).json({ msg: "Persona no encontrada" });
            });
        } else {
            res.status(400).json({ msg: "ID inválido (debe ser un número)" });
        }
    });

    // POST nueva persona
    router.post("/", function (req, res) {
        const personaData = {
            Id_Persona: null,
            Tipo_Documento: req.body.Tipo_Documento,
            Num_Documento: req.body.Num_Documento,
            Primer_Nombre: req.body.Primer_Nombre,
            Segundo_Nombre: req.body.Segundo_Nombre,
            Primer_Apellido: req.body.Primer_Apellido,
            Segundo_Apellido: req.body.Segundo_Apellido,
            Fecha_Nacimiento: req.body.Fecha_Nacimiento,
            Estado_Civil: req.body.Estado_Civil,
            Eps_Persona: req.body.Eps_Persona
        };

        const errores = validarPersona(personaData);
        if (errores.length > 0) {
            return res.status(400).json({
                error: "Datos inválidos. Revisa los siguientes campos:",
                campos: errores,
                ejemplo_correcto: {
                    "Tipo_Documento": 1,
                    "Num_Documento": "1234567890",
                    "Primer_Nombre": "Laura",
                    "Segundo_Nombre": "Marcela",
                    "Primer_Apellido": "Gómez",
                    "Segundo_Apellido": null,
                    "Fecha_Nacimiento": "1998-06-15",
                    "Estado_Civil": 2,
                    "Eps_Persona": 4
                }
            });
        }

        PersonasModelo.insertarPersona(personaData, function (error, data) {
            if (data) res.status(200).json(data);
            else res.status(500).json({ error: "Error al registrar persona" });
        });
    });

    // PUT actualizar persona
    router.put("/", function (req, res) {
        const personaData = {
            Id_Persona: req.body.Id_Persona,
            Tipo_Documento: req.body.Tipo_Documento,
            Num_Documento: req.body.Num_Documento,
            Primer_Nombre: req.body.Primer_Nombre,
            Segundo_Nombre: req.body.Segundo_Nombre,
            Primer_Apellido: req.body.Primer_Apellido,
            Segundo_Apellido: req.body.Segundo_Apellido,
            Fecha_Nacimiento: req.body.Fecha_Nacimiento,
            Estado_Civil: req.body.Estado_Civil,
            Eps_Persona: req.body.Eps_Persona
        };

        const errores = validarPersona(personaData, true);
        if (errores.length > 0) {
            return res.status(400).json({
                error: "Datos inválidos para actualizar. Revisa los siguientes campos:",
                campos: errores,
                ejemplo_correcto: {
                    "Id_Persona": 7,
                    "Tipo_Documento": 2,
                    "Num_Documento": "9876543210",
                    "Primer_Nombre": "Luis",
                    "Segundo_Nombre": null,
                    "Primer_Apellido": "Pérez",
                    "Segundo_Apellido": "Ramírez",
                    "Fecha_Nacimiento": "1992-12-30",
                    "Estado_Civil": null,
                    "Eps_Persona": 1
                }
            });
        }

        PersonasModelo.modificarPersona(personaData, function (error, data) {
            if (data) res.status(200).json(data);
            else res.status(500).json({ error: "Error al actualizar persona" });
        });
    });

    // DELETE persona
    router.delete("/:id", function (req, res) {
        const id = parseInt(req.params.id);
        if (!isNaN(id)) {
            PersonasModelo.eliminarPersona(id, function (error, data) {
                if (data) res.status(200).json(data);
                else res.status(404).json({ msg: "No se pudo eliminar" });
            });
        } else {
            res.status(400).json({ msg: "ID inválido (debe ser un número)" });
        }
    });

    return router;
};
