const express = require('express');
const router = express.Router();
const MesasXMenuModelo = require('../modelos/MesasXMenuModelo');

module.exports = function() {

    // Obtener todos los registros de mesas por menú
    router.get('/', (req, res) => {
        MesasXMenuModelo.getMesasXMenu((error, datos) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al obtener las mesas por menú', error });
            } else {
                res.status(200).json(datos);
            }
        });
    });

    // Obtener mesas por ID de menú
    router.get('/:id', (req, res) => {
        const id = req.params.id;  // El id del menú
        MesasXMenuModelo.getMesasXMenuByMenuId(id, (error, datos) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al obtener las mesas para este menú', error });
            } else {
                if (datos.length === 0) {
                    res.status(404).json({ mensaje: 'No se encontraron mesas para este menú.' });
                } else {
                    res.status(200).json(datos);  // Devuelve todas las mesas asociadas con ese menú
                }
            }
        });
    });

    // Insertar una nueva mesa para el menú
    router.post('/', (req, res) => {
        const mesaData = req.body;
        MesasXMenuModelo.insertarMesaXMenu(mesaData, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al registrar la mesa para el menú', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    // Modificar una mesa existente
    router.put('/:id', (req, res) => {
        const id = req.params.id;
        const mesaData = { ...req.body, Id_Mesa: id };

        MesasXMenuModelo.modificarMesaXMenu(mesaData, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al actualizar la mesa para el menú', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    // Eliminar una mesa por ID
    router.delete('/:id', (req, res) => {
        const id = req.params.id;

        MesasXMenuModelo.eliminarMesaXMenu(id, (error, resultado) => {
            if (error) {
                res.status(500).json({ mensaje: 'Error al eliminar la mesa para el menú', error });
            } else {
                res.status(200).json(resultado);
            }
        });
    });

    return router;
};
