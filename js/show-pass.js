// Get references to the relevant elements
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const showPasswordCheckbox = document.querySelector('input[name="myCheckbox"]');

// Add an event listener to the checkbox
showPasswordCheckbox.addEventListener("change", function () {
    if (this.checked) {
        // Change input types to "text" to show password characters
        passwordInput.type = "text";
        confirmPasswordInput.type = "text";
    } else {
        // Change input types back to "password" to hide password characters
        passwordInput.type = "password";
        confirmPasswordInput.type = "password";
    }
});