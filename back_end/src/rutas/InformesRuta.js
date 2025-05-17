const express = require('express');
const router = express.Router();
const InformesModelo = require('../modelos/InformesModelo');

// ... 

router.post('/1', function (req, res) {
    const { fecha_inicio, fecha_fin, nombre, apellido } = req.body;

    const camposEsperados = ['fecha_inicio', 'fecha_fin', 'nombre', 'apellido'];
    const camposRecibidos = Object.keys(req.body);
    const camposInvalidos = camposRecibidos.filter(key => !camposEsperados.includes(key));

    const ejemplo = {
        ejemplo_json: {
            fecha_inicio: "2024-01-01",
            fecha_fin: "2024-12-31",
            nombre: "Carlos",       // opcional
            apellido: "Ramírez"     // opcional
        }
    };

    // Validación de campos mal escritos
    if (camposInvalidos.length > 0) {
        return res.status(400).json({
            error: `Se encontraron campos no reconocidos: ${camposInvalidos.join(', ')}`,
            mensaje: "Verifique que los nombres de las claves sean correctos.",
            ...ejemplo
        });
    }

    // Validaciones básicas
    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({
            error: "Se requieren 'fecha_inicio' y 'fecha_fin' en el cuerpo de la solicitud.",
            ...ejemplo
        });
    }

    // Validación de formato de fecha
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha_inicio) || !fechaRegex.test(fecha_fin)) {
        return res.status(400).json({
            error: "Las fechas deben tener el formato 'YYYY-MM-DD'.",
            ...ejemplo
        });
    }

    const filtros = {
        fecha_inicio,
        fecha_fin,
        nombre: nombre || null,
        apellido: apellido || null
    };

    InformesModelo.getInformeReservas1(filtros, function (error, data) {
        if (error) {
            res.status(500).json({ error: 'Error al generar el informe de reservas' });
        } else if (data.length === 0) {
            res.status(404).json({ mensaje: 'No se encontraron reservas con los criterios proporcionados' });
        } else {
            res.json(data);
        }
    });
});

// Obtener informe de reservas por nombre de plato y fechas
router.post('/2', function (req, res) {
    const { fecha_inicio, fecha_fin, plato } = req.body;

    const camposEsperados = ['fecha_inicio', 'fecha_fin', 'plato'];
    const camposRecibidos = Object.keys(req.body);
    const camposInvalidos = camposRecibidos.filter(key => !camposEsperados.includes(key));

    const ejemplo = {
        ejemplo_json: {
            fecha_inicio: "2024-01-01",
            fecha_fin: "2024-12-31",
            plato: "Pizza", // opcional
        }
    };

    // Validación de campos mal escritos
    if (camposInvalidos.length > 0) {
        return res.status(400).json({
            error: `Se encontraron campos no reconocidos: ${camposInvalidos.join(', ')}`,
            mensaje: "Verifique que los nombres de las claves sean correctos.",
            ...ejemplo
        });
    }

    // Validaciones básicas
    if (!fecha_inicio || !fecha_fin) {
        return res.status(400).json({
            error: "Se requieren 'fecha_inicio' y 'fecha_fin' en el cuerpo de la solicitud.",
            ...ejemplo
        });
    }

    // Validación de formato de fecha
    const fechaRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!fechaRegex.test(fecha_inicio) || !fechaRegex.test(fecha_fin)) {
        return res.status(400).json({
            error: "Las fechas deben tener el formato 'YYYY-MM-DD'.",
            ...ejemplo
        });
    }

    const filtros = {
        fecha_inicio,
        fecha_fin,
        plato: plato || null
    };

    InformesModelo.getInformeReservas2(filtros, function (error, data) {
        if (error) {
            res.status(500).json({ error: 'Error al generar el informe de reservas' });
        } else if (data.length === 0) {
            res.status(404).json({ mensaje: 'No se encontraron reservas con los criterios proporcionados' });
        } else {
            res.json(data);
        }
    });
});

module.exports = router;
