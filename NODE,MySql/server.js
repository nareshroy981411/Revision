const express = require('express');
const bodyParser = require('body-parser');
const eventsRoutes = require('./routes/eventsRoutes');

const app = express();
app.use(bodyParser.json());

// Routes
app.use('/events', eventsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
