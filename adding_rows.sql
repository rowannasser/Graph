-- Insert rows into the nodes table
INSERT INTO nodes (left_coordinate, top_coordinate)
VALUES  (10, 20),
        (30, 40),
        (50, 60);

-- Insert rows into the edges table
INSERT INTO edges (source_node_id, version, target_node_id)
VALUES  (1, '2024-02-07 12:00:00', 2),
        (2, '2024-02-07 13:00:00', 3),
        (3, '2024-02-07 14:00:00', 1);