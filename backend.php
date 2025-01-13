<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

$conn = new mysqli("mysql.caesar.elte.hu", "acskrisz", "8LqP1qaP0DjXxHwf", "acskrisz");

if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Adatbázis hiba: " . $conn->connect_error]));
}

$action = $_POST['action'] ?? $_GET['action'] ?? null;

if ($action === 'login') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("SELECT id, username FROM users WHERE username = ? AND password = ?");
    $stmt->bind_param("ss", $username, $password);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode(["success" => true, "username" => $user['username']]);
    } else {
        echo json_encode(["success" => false, "message" => "Hibás felhasználónév vagy jelszó."]);
    }
    $stmt->close();
} elseif ($action === 'register') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    $stmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $stmt->bind_param("ss", $username, $password);

    if ($stmt->execute()) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Nem sikerült regisztrálni a felhasználót."]);
    }
    $stmt->close();
} elseif ($action === 'getLeaderboard') {
    $result = $conn->query("
        SELECT u.username, l.score
        FROM leaderboard l
        JOIN users u ON l.user_id = u.id
        ORDER BY l.score DESC
        LIMIT 10
    ");

    if ($result->num_rows > 0) {
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode(["success" => true, "data" => $data]);
    } else {
        echo json_encode(["success" => false, "message" => "Nincs elérhető ranglista adat."]);
    }
}
elseif ($action === 'saveScore') {
    $username = $_POST['username'] ?? '';
    $score = $_POST['score'] ?? 0;

    if ($username && $score !== null) {
        $stmt = $conn->prepare("SELECT id FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            $userId = $user['id'];
            $stmt = $conn->prepare("INSERT INTO leaderboard (userid, score) VALUES (?, ?)");
            $stmt->bind_param("ii", $userId, $score);

            if ($stmt->execute()) {
                echo json_encode(["success" => true, "message" => "Pontszám sikeresen mentve."]);
            } else {
                echo json_encode(["success" => false, "message" => "Hiba történt a pontszám mentésekor."]);
            }
        } else {
            echo json_encode(["success" => false, "message" => "Felhasználó nem található."]);
        }
        $stmt->close();
    } else {
        echo json_encode(["success" => false, "message" => "Hiányzó adatok."]);
    }
} else {
    echo json_encode(["success" => false, "message" => "Ismeretlen művelet."]);}

$conn->close();
?>
