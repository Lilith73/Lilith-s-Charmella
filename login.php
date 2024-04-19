<?php
session_start();
include "./myFunctions.php";

$errorCode = 1;
$errorMessage = "Sikertelen bejelentekezés";
$dataLine = [];

$rawData = file_get_contents("php://input");
$data = json_decode($rawData, true);

if ($data !== null) {
    $user_name = $data["userName"];
    $user_password = md5($data["password"]);
} else {
    $user_name = $_POST["userName"];
    $user_password = md5($_POST["password"]);
}

if (isset($_SESSION["userName"]) && $_SESSION["userName"] === $user_name) {
    $errorCode = 0;
    $errorMessage = "Ön már be van jelentkezve!";
    $dataLine = [];
    sendMessage($errorCode, $errorMessage, $dataLine);
    exit;
}

$conn = new mysqli("localhost", "root", "", "adatbazis");
if ($conn->connect_error) {
    $errorCode = 1;
    $errorMessage = "Sikertelen adatbázis-kapcsolódás!";
    $dataLine = [];
    sendMessage($errorCode, $errorMessage, $dataLine);
    exit;
}

$stmt = $conn->prepare("SELECT * from users WHERE username = ?;");
$stmt->bind_param("s", $user_name);

$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    if ($user_password==$row["password"]) {
        $_SESSION["userName"] = $row["username"];
        $_SESSION["fullName"] = $fullName;

        $errorCode = 0;
        $errorMessage = "Sikeres bejelentekezés";
        $dataLine = [];

    } else {
        $errorCode = 1;
        $errorMessage = "Hibás felhasználónév vagy jelszó!";
    }
} else {
    $errorCode = 1;
    $errorMessage = "Hibás felhasználónév vagy jelszó!";
}

sendMessage($errorCode, $errorMessage, $dataLine);
$conn->close();
?>