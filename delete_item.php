<?php
header("Content-Type: application/json");
require "config.php";

$id = $_POST['id'];

$sql = "DELETE FROM shared_list WHERE id=$id";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
