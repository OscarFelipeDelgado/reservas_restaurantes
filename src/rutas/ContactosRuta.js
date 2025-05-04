const express = require('express');
const router = express.Router();
const ContactosModelo = require('../modelos/ContactosModelo');

module.exports = function() {

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

    // Obtener un contacto por ID
    router.get('/:id', (req, res) => {
        const id = req.params.id;  // El id de la persona
        ContactosModelo.getContactosByPersonaId(id, (error, datos) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al obtener los contactos de la persona', error });
            } else {
                if (datos.length === 0) {
                    res.status(404).json({ mensaje: 'No se encontraron contactos para esta persona.' });
                } else {
                    res.status(200).json(datos);  // Devuelve todos los contactos de esa persona
                }
            }
        });
    });


    // Insertar un nuevo contacto
    router.post('/', (req, res) => {
        const contactoData = req.body;
        ContactosModelo.insertarContacto(contactoData, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al registrar el contacto', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    // Modificar un contacto existente
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const contactoData = { ...req.body, Id_Contacto: id };

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
