<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// require 'vendor/autoload.php'; // If using Composer
require 'PHPMailer/src/PHPMailer.php'; // If manually downloaded
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $company = $_POST['company'];
    $phone = $_POST['phone'];
    $service = $_POST['service'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP Configuration
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Use your SMTP provider
        $mail->SMTPAuth = true;
        $mail->Username = 'imyouralok@gmail.com'; // Replace with your email
        $mail->Password = 'dcywicdldjtkdmbl'; // Use an App Password if using Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Email Setup
        $mail->setFrom($email, $name);
        $mail->addAddress('dilkhushjha08@gmail.com'); // Your recipient email

        $mail->Subject = 'New Inquiry from Website';
        $mail->Body = "Name: $name\nEmail: $email\nCompany: $company\nPhone: $phone\nService: $service\nMessage:\n$message";

        $mail->send();
        echo "success";
    } catch (Exception $e) {
        echo "error: {$mail->ErrorInfo}";
    }
}
?>
