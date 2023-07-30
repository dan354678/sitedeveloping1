<?php
// Establish database connection
$servername = "SecureDBlp";
$username = "SecureDBlp";
$password = "Wz5Dyxhh213KCNG9";
$dbname = "SecureDBlp";

$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user input from the login form
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = $_POST["username"];
    $password = $_POST["password"];

    // Validate user input here if needed (e.g., check for empty fields)

    // Query the database to check if the user exists
    $query = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($query);

    if ($result->num_rows === 1) {
        $row = $result->fetch_assoc();
        $hashedPassword = $row["password"];

        // Verify the hashed password
        if (password_verify($password, $hashedPassword)) {
            // Start a session and store user information
            session_start();
            $_SESSION["user_id"] = $row["id"];
            $_SESSION["username"] = $row["username"];

            // Redirect to a secure page after successful login
            header("Location: secure_page.php");
        } else {
            // Incorrect password
            echo "Incorrect username or password.";
        }
    } else {
        // User not found
        echo "Incorrect username or password.";
    }
}

// Close the database connection
$conn->close();
?>
