
<?php
    session_start();
    include "./myFunctions.php";
    mysqli_report(MYSQLI_REPORT_OFF);

    $errorCode = 0;
    $errorMessage = "";
    $dataLine = [];

    $raw_data = file_get_contents("php://input");
    $data = json_decode($raw_data, true);
    if ($data !== null) {
        $user_name = $data["userName"];
        $email = $data["email"];
        $password = md5($data["password"]);
    } else {
        $user_name = $_POST["userName"];
        $email = $_POST["email"];
        $password = md5($_POST["password"]);
    }

    // SQL
    $conn = new mysqli("127.0.0.1", "root", "", "adatbazis");
    if ($conn->connect_error) {
        $errorCode = 1;
        $errorMessage = "Adatbázis-kapcsolati hiba";
        sendMessage($errorCode, $errorMessage, $dataLine);
        exit;
    }

    $stmt = $conn->prepare("SELECT username from users WHERE username = ?;");
    $stmt->bind_param("s", $user_name);
    $stmt->execute();

    $result = $stmt->get_result();
    if ($result->num_rows > 0) {
        $errorMessage = "Ez a felhasználónév már foglalt!";
        $errorCode = 2;
        sendMessage($errorCode, $errorMessage, $dataLine);
        exit;
    }

    $stmt = $conn->prepare("INSERT into users (username, email, password) VALUE (?,?,?)");
    $stmt->bind_param("sss", $user_name, $email, $password);
    $stmt->execute();

    if ($stmt->affected_rows < 1) {
        $errorCode = 3;
        $errorMessage = "Sikertelen adminisztráció!";
        sendMessage($errorCode, $errorMessage, $dataLine);
        exit;
    }

    sendMessage($errorCode, $errorMessage, $dataLine);
?>