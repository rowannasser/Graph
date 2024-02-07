const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const GraphData = require('./models/graphData');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.get('/graph', async (req, res) => {
  try {
    const graphData = await GraphData.findAll();
    res.json(graphData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/graph', async (req, res) => {
  try {
    const { source_node, version, target_node, left_shift, top_shift } = req.body;
    const graphData = await GraphData.create({ source_node, version, target_node, left_shift, top_shift });
    console.log('New graph data created:', graphData);
    res.status(201).json(graphData);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
