const express = require('express');

const router = express.Router();
const ClientController = require('../controllers/ClientController');

// acá van las rutas del CRUD  
router.post('/', ClientController.addClients);
router.get('/', ClientController.showClients);
router.get('/:id', ClientController.showClient);
router.delete('/:id', ClientController.deleteClients);
router.patch('/:id', ClientController.updateClients);
// router.put('/:id', ClientController.updateClient);
// router.put('/:id', ClientController.upgradeClients);

module.exports = router; 