const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Node = require('./models/node');
const Edge = require('./models/edge');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3301;

app.use(bodyParser.json());
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/graph_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => console.error('Error connecting to MongoDB:', err));


// Define routes
app.get('/graph', async (req, res) => {
  try {
    console.log("Sending all nodes and edges");
    const nodes = await Node.find();
    const edges = await Edge.find();
    const graphData = {
      'nodes': nodes,
      'edges': edges
    };
    res.json(graphData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Node
app.post('/nodes', async (req, res) => {
  try {
    console.log("Creating a new node");
    const { left_coordinate, top_coordinate } = req.body;
    const node = await Node.create({ left_coordinate, top_coordinate });
    console.log("A new node is created");
    res.status(201).json(node);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create Edge
app.post('/edges', async (req, res) => {
  try {
    console.log("Creating a new edge");
    const { source_node_id, version, target_node_id } = req.body;
    const edge = await Edge.create({ source_node_id, version, target_node_id });
    console.log("A new edge is created");
    res.status(201).json(edge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Node coordinates
app.post('/update', async (req, res) => {
  try {
    console.log("Updating node coordinates");
    const { id, left_coordinate, top_coordinate } = req.body;
    const node = await Node.findByIdAndUpdate(id, { left_coordinate, top_coordinate }, { new: true });
    if (!node) {
      return res.status(404).json({ error: 'Node not found' });
    }
    console.log("Node coordinates updated");
    res.status(200).json(node);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});