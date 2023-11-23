const express = require('express');
const router = express.Router();

const eventsController = require("../controllers/events");
const validation = require('../middleware/validate');

router.get('/', eventsController.getAllEvents);

router.get('/:id', eventsController.getSingleEvent);

router.post('/', validation.saveEvent, eventsController.createEvent);

router.put('/:id', validation.saveEvent, eventsController.updateEvent);

router.delete('/:id', eventsController.deleteEvent);

module.exports = router;
