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

INSERT INTO nodes (left_coordinate, top_coordinate)
VALUES  (10, 20),
        (100, 300),
        (220, 300),
        (400, 15),
        (450, 250),
        (600, 45),
        (880,250),
        (555,370),
        (850, 30),
        (780,420);
        


INSERT INTO edges (source_node_id, version, target_node_id)
VALUES  (1, '2024-02-07 12:00:00', 2),
        (2, '2024-02-07 13:00:00', 3),
        (3, '2024-02-07 12:00:00', 5),
        (6, '2024-02-07 14:00:00', 4),
        (4, '2024-02-07 13:00:00', 1),
        (5, '2024-02-07 13:00:00', 8),
        (8, '2024-02-07 13:00:00', 10),
        (10, '2024-02-07 13:00:00', 7),
        (7, '2024-02-07 13:00:00', 9),
        (9, '2024-02-07 13:00:00', 6);


