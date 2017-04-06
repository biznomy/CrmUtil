var express = require('express');
var router = express.Router();
var crmController = require('../controllers/crmController.js');

router.get('/', crmController.list);

router.get('/:id', crmController.show);

router.post('/', crmController.create);

router.get('/checkout/all', crmController.checkout);



module.exports = router;
