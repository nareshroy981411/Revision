const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/eventsController');

// Define routes
router.post('/', EventsController.addEvent);
router.get('/find', EventsController.findEvents);

module.exports = router;
