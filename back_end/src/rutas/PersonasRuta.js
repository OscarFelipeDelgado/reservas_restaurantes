const express = require('express');
const router = express.Router();
const { PersonasModelo } = require('../modelos/PersonasModelo');

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
    router.post("/", async function (req, res) {
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
                campos: errores
            });
        }

        try {
            const [tipoDocValido, epsValido, estadoCivilValido] = await Promise.all([
                PersonasModelo.existeEnCatalogo(personaData.Tipo_Documento, 2),
                PersonasModelo.existeEnCatalogo(personaData.Eps_Persona, 4),
                personaData.Estado_Civil !== null
                    ? PersonasModelo.existeEnCatalogo(personaData.Estado_Civil, 3)
                    : Promise.resolve(true)
            ]);

            if (!tipoDocValido || !epsValido || !estadoCivilValido) {
                const [tiposDoc, epsList, estadosCiviles] = await Promise.all([
                    PersonasModelo.obtenerValoresCatalogo(2),
                    PersonasModelo.obtenerValoresCatalogo(4),
                    PersonasModelo.obtenerValoresCatalogo(3)
                ]);

                return res.status(400).json({
                    error: "Uno o más campos no son válidos según el catálogo",
                    campos_invalidos: {
                        Tipo_Documento: tipoDocValido ? "válido" : "inválido",
                        Eps_Persona: epsValido ? "válido" : "inválido",
                        Estado_Civil: estadoCivilValido ? "válido" : "inválido"
                    },
                    valores_validos: {
                        Tipo_Documento: tiposDoc,
                        Eps_Persona: epsList,
                        Estado_Civil: estadosCiviles
                    }
                });
            }

            PersonasModelo.insertarPersona(personaData, function (error, data) {
                if (data) res.status(200).json(data);
                else res.status(500).json({ error: "Error al registrar persona" });
            });
        } catch (error) {
            console.error("Error en validación de catálogo:", error);
            res.status(500).json({
                error: "Error al validar catálogos",
                detalle: error.message || error.toString() || "Error desconocido"
            });
        }
    });

    // PUT actualizar persona
    router.put("/", async function (req, res) {
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
                campos: errores
            });
        }

        try {
            const [tipoDocValido, epsValido, estadoCivilValido] = await Promise.all([
                PersonasModelo.existeEnCatalogo(personaData.Tipo_Documento, 2),
                PersonasModelo.existeEnCatalogo(personaData.Eps_Persona, 4),
                personaData.Estado_Civil !== null
                    ? PersonasModelo.existeEnCatalogo(personaData.Estado_Civil, 3)
                    : Promise.resolve(true)
            ]);

            if (!tipoDocValido || !epsValido || !estadoCivilValido) {
                const [tiposDoc, epsList, estadosCiviles] = await Promise.all([
                    PersonasModelo.obtenerValoresCatalogo(2),
                    PersonasModelo.obtenerValoresCatalogo(4),
                    PersonasModelo.obtenerValoresCatalogo(3)
                ]);

                return res.status(400).json({
                    error: "Uno o más campos no son válidos según el catálogo",
                    campos_invalidos: {
                        Tipo_Documento: tipoDocValido ? "válido" : "inválido",
                        Eps_Persona: epsValido ? "válido" : "inválido",
                        Estado_Civil: estadoCivilValido ? "válido" : "inválido"
                    },
                    valores_validos: {
                        Tipo_Documento: tiposDoc,
                        Eps_Persona: epsList,
                        Estado_Civil: estadosCiviles
                    }
                });
            }

            PersonasModelo.modificarPersona(personaData, function (error, data) {
                if (data) res.status(200).json(data);
                else res.status(500).json({ error: "Error al actualizar persona" });
            });
        } catch (error) {
            console.error("Error en validación de catálogo:", error);
            res.status(500).json({
                error: "Error al validar catálogos",
                detalle: error.message || error.toString() || "Error desconocido"
            });
        }
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
