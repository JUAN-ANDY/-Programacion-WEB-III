const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Definición de rutas principales
router.get('/', productosController.list);
router.get('/nuevo', productosController.form);
router.get('/editar/:id', productosController.form);
router.post('/guardar', productosController.save);
router.get('/eliminar/:id', productosController.delete);

module.exports = router;
