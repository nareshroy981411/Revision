const pool = require('../config/database');

const Events = {
  addEvent: async (eventData) => {
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('INSERT INTO events SET ?', eventData);
      connection.release();
      return result.insertId;
    } catch (error) {
      throw error;
    }
  },
  findEvents: async (latitude, longitude, date, page = 1, pageSize = 10) => {
    try {
      const connection = await pool.getConnection();
      const [events] = await connection.query('SELECT * FROM events WHERE date BETWEEN ? AND DATE_ADD(?, INTERVAL 14 DAY)', [date, date]);
      connection.release();
      return events;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = Events;
