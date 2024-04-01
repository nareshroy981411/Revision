const Events = require('../models/eventsModel');
const axios = require('axios');

const weatherApiUrl = "https://gg-backend-assignment.azurewebsites.net/api/Weather";
const distanceApiUrl = "https://gg-backend-assignment.azurewebsites.net/api/Distance";

const EventsController = {
  addEvent: async (req, res) => {
    try {
      const eventData = req.body;
      const eventId = await Events.addEvent(eventData);
      res.status(201).json({ message: "Event added successfully", eventId });
    } catch (error) {
      console.error("Error adding event:", error);
      res.status(500).json({ error: "Error adding event" });
    }
  },
  findEvents: async (req, res) => {
    try {
      const { latitude, longitude, date, page, pageSize } = req.query;
      const events = await Events.findEvents(latitude, longitude, date, page, pageSize);

      // Code to fetch weather and distance data and format response
      // ...
      
      res.json({ events: formattedEvents, page, pageSize, totalEvents: events.length, totalPages: Math.ceil(events.length / pageSize) });
    } catch (error) {
      console.error("Error finding events:", error);
      res.status(500).json({ error: "Error finding events" });
    }
  }
};

module.exports = EventsController;
