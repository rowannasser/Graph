CREATE database graph_data;
use graph_data;

CREATE TABLE graph_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  source_node VARCHAR(255),
  version VARCHAR(255),
  target_node VARCHAR(255),
  left_shift float,
  top_shift float
);

SELECT * from graph_data;