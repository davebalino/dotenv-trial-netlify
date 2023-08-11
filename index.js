// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

// Your web app's Firebase configuration html-10 save 3
const firebaseConfig = {
    apiKey: "AIzaSyAPb9NizAmyshhglpk1NombXSFgdfaQ2vg",
    authDomain: "eprogress-account-database.firebaseapp.com",
    projectId: "eprogress-account-database",
    storageBucket: "eprogress-account-database.appspot.com",
    messagingSenderId: "72882320286",
    appId: "1:72882320286:web:822235eb2be05e86b61c8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Function to handle form submission
document.getElementById("submit").addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Perform user registration here
    createUserWithEmailAndPassword(getAuth(app), email, password)
        .then((userCredential) => {
            // User account created successfully
            const user = userCredential.user;

            // Send email verification
            sendEmailVerification(user)
                .then(() => {
                    alert("Sign Up successful. Please check your email for verification.");

                    // Redirect to sign-in page on successful sign-up
                    window.location.href = "index.html";
                })
                .catch((error) => {
                    console.error(error);
                    alert("Sign Up successful, but failed to send verification email.");
                });
        })
        .catch((error) => {
            console.error(error);
            alert("Error signing up: " + error.message);
        });
});