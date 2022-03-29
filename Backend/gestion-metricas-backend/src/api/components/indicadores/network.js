const express = require('express');
const router = express.Router();
const controller = require('./controller');

router.get('/',controller.list);
router.get('/id/:ID', controller.get);
router.get('/buscar/:columName/:value',controller.search);
router.post('/nuevo', controller.insert);
router.get('/contar', controller.count);
router.put('/actualizar', controller.update);
router.delete('/eliminar/:ID', controller.remove);
router.get('/totalDatos',controller.totalDatos);

module.exports = router;
