<?php
header("Content-Type: application/json");
require "config.php";

$result = $conn->query("SELECT * FROM shared_list ORDER BY id DESC");

$items = [];

while ($row = $result->fetch_assoc()) {
    $items[] = $row;
}

echo json_encode($items);

$conn->close();
?>
