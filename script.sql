CREATE database graph_data;
use graph_data;

CREATE TABLE nodes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  left_coordinate INT NOT NULL,
  top_coordinate INT NOT NULL
);

CREATE TABLE edges (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source_node_id INT NOT NULL,
  version DATETIME,
  target_node_id INT NOT NULL,
  FOREIGN KEY (source_node_id) REFERENCES nodes(id),
  FOREIGN KEY (target_node_id) REFERENCES nodes(id)
);
