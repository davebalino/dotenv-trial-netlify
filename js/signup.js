// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from './api.js';

// Your web app's Firebase configuration html-10 save 3
const firebaseConfig = { apiKey: API_KEY, authDomain: AUTH_DOMAIN, projectId: PROJECT_ID, storageBucket: STORAGE_BUCKET, messagingSenderId: MESSAGING_SENDER_ID, appId: APP_ID };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to handle form submission
document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const signUpButton = document.querySelector(".button-text"); // Select the button-text element //Rotating loader - Signing up
    const loader = document.getElementById("loader"); //Rotating loader - Signing up
    const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

        // Check if passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please make sure both passwords match.");
            return;
        }

        // Show loader and change button text
        signUpButton.disabled = true; //Rotating loader - Signing up
        signUpButton.textContent = "Signing up..."; //Rotating loader - Signing up
        loader.style.display = "block"; //Rotating loader - Signing up

    // Perform user registration here
    createUserWithEmailAndPassword(getAuth(app), email, password)
        .then((userCredential) => {
            // User account created successfully
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    alert("Sign Up successful. Please check your email for verification.");

            // Clear form fields after successful sign-up
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            document.getElementById("confirmPassword").value = "";

            // Uncheck the "Show password" checkbox
            showPasswordCheckbox.checked = false;
            
            // Hide loader and reset button text
            signUpButton.disabled = false; //Rotating loader - Signing up
            signUpButton.textContent = "Sign up"; //Rotating loader - Signing up
            loader.style.display = "none"; //Rotating loader - Signing up

            // Redirect to sign-in page on successful sign-up
            // Delay before redirecting to signin.html
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 1000); // 1000 milliseconds = 1 second
        })
        .catch((error) => {
            console.error(error);
            alert("Sign Up successful, but failed to send verification email.");
        });
    })
    .catch((error) => {
        console.error(error);
        alert("Error signing up: " + error.message);

        // Hide loader and reset button text
        signUpButton.disabled = false; //Rotating loader - Signing up
        signUpButton.textContent = "Sign up"; //Rotating loader - Signing up
        loader.style.display = "none"; //Rotating loader - Signing up
    });
        
});