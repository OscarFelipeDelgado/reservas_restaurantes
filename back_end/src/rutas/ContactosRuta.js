const express = require('express');
const router = express.Router();
const ContactosModelo = require('../modelos/ContactosModelo');

module.exports = function () {

    // Catálogo de tipos de contacto válidos
    const tiposContactoValidos = {
        501: "Teléfono",
        502: "Celular",
        503: "Email",
        504: "Dirección",
        505: "Red Social"
    };

    // Obtener todos los contactos
    router.get('/', (req, res) => {
        ContactosModelo.getContactos((error, datos) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al obtener los contactos', error });
            } else {
                res.status(200).json(datos);
            }
        });
    });

    // Obtener contactos por ID de persona
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        ContactosModelo.getContactosByPersonaId(id, (error, datos) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al obtener los contactos de la persona', error });
            } else {
                if (datos.length === 0) {
                    res.status(404).json({ mensaje: 'No se encontraron contactos para esta persona.' });
                } else {
                    res.status(200).json(datos);
                }
            }
        });
    });

    // Insertar un nuevo contacto (POST)
    router.post('/', (req, res) => {
        const contactoData = req.body;

        // Validación del Tipo_Contacto
        if (!tiposContactoValidos[contactoData.Tipo_Contacto]) {
            return res.status(400).json({
                mensaje: `Tipo_Contacto inválido. Debe ser uno de los siguientes: ${Object.entries(tiposContactoValidos)
                    .map(([id, nombre]) => `${id}: ${nombre}`)
                    .join(', ')}.`
            });
        }

        ContactosModelo.insertarContacto(contactoData, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al registrar el contacto', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    // Modificar un contacto existente (PUT)
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const contactoData = { ...req.body, Id_Contacto: id };

        // Validación del Tipo_Contacto
        if (!tiposContactoValidos[contactoData.Tipo_Contacto]) {
            return res.status(400).json({
                mensaje: `Tipo_Contacto inválido. Debe ser uno de los siguientes: ${Object.entries(tiposContactoValidos)
                    .map(([id, nombre]) => `${id}: ${nombre}`)
                    .join(', ')}.`
            });
        }

        ContactosModelo.modificarContacto(contactoData, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al actualizar el contacto', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    // Eliminar un contacto por ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id;

        ContactosModelo.eliminarContacto(id, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al eliminar el contacto', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    return router;
};
