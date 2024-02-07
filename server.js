const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const Node = require('./models/node');
const Edge = require('./models/edge')

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define routes
app.get('/graph', async (req, res) => {
  try {
    console.log(".......Sending all nodes and edges");
    const nodes = await Node.findAll();
    const edges = await Edge.findAll();
    const graphData = {
      'nodes': nodes,
      'edges': edges
    }
    res.json(graphData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Node
app.post('/nodes', async (req, res) => {
  try {
    console.log(".......Creating a new node");
    const { left_coordinate, top_coordinate } = req.body;
    const node = await Node.create({ left_coordinate, top_coordinate });
    console.log("A new node is created");
    res.status(201).json(node);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Edge
app.post('/edges', async (req, res) => {
  try {
    console.log(".......Creating a new edge");
    const { source_node_id, version, target_node_id } = req.body;
    const edge = await Edge.create({ source_node_id, version, target_node_id });
    console.log("A new edge is created");
    res.status(201).json(edge);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Sync database and start server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
