
document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(this);

    fetch("sendMail.php", {
        method: "POST",
        body: formData
    })
        .then(response => response.text())
        .then(data => {
            if (data.trim() === "success") {
                document.getElementById("formMessage").innerHTML = "<p style='color: green;'>Message sent successfully!</p>";
                document.getElementById("contactForm").reset();
            } else {
                document.getElementById("formMessage").innerHTML = "<p style='color: red;'>Error sending message. Please try again.</p>";
            }
        })
        .catch(error => console.error("Error:", error));
});
