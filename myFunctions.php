<?php
function printLog($input) {
    $fileName = "./log.txt";
    $handle = fopen($fileName, "w");
    fwrite($handle, date("Y-m-d H:i:s") . ": " . $input);
    fclose($handle);
};

function sendMessage($errCode, $errMessage, $dLine) {
    header("Content-Type: application/json");
    echo json_encode(array("errorCode" => $errCode, "errorMessage" => $errMessage, "dataLine" => $dLine));
    return;
};
?>