<?php
// Check if the form was submitted using POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the email from the form
    $email = $_POST['email'];
    
    // Validate the email to ensure it’s in the correct format
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Define the file where emails will be saved
        $file = 'emails.txt';
        
        // Append the email to the file (with a new line)
        file_put_contents($file, $email . "\n", FILE_APPEND | LOCK_EX);
        
        // Redirect to a thank you page
        header('Location: thank_you.html');
        exit;
    } else {
        // Display an error if the email is invalid
        echo "Invalid email address.";
    }
} else {
    // Display an error if the form wasn’t submitted correctly
    echo "Form not submitted correctly.";
}
?>