<?php
header("Content-Type: application/json");
require "config.php";

if (!isset($_POST['text']) || trim($_POST['text']) === "") {
    echo json_encode(["success" => false, "error" => "No text provided"]);
    exit;
}

$text = $conn->real_escape_string($_POST["text"]);

$sql = "INSERT INTO shared_list (text) VALUES ('$text')";

if ($conn->query($sql)) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
