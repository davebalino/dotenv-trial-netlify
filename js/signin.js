// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";
import { API_KEY, AUTH_DOMAIN, PROJECT_ID, STORAGE_BUCKET, MESSAGING_SENDER_ID, APP_ID } from './api.js';

// Your web app's Firebase configuration html-10 save 3
const firebaseConfig = { apiKey: API_KEY, authDomain: AUTH_DOMAIN, projectId: PROJECT_ID, storageBucket: STORAGE_BUCKET, messagingSenderId: MESSAGING_SENDER_ID, appId: APP_ID };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

document.getElementById("loginBtn").addEventListener('click', function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const signUpButton = document.querySelector(".button-text"); //Rotating loader - Signing up
    const loader = document.getElementById("loader"); //Rotating loader - Signing up
    const showPasswordCheckbox = document.getElementById("showPasswordCheckbox");

    const auth = getAuth(app);

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            if (user.emailVerified) {
                // Successful login
                window.location.href = "dashboard.html"; // Redirect to the dashboard page after login
            } else {
                // Display confirmation dialog to resend verification email
                const resendConfirmation = window.confirm("Please verify your email before logging in. Would you like to resend the verification email?");

                if (resendConfirmation) {
                    // Resend the verification email
                    sendEmailVerification(user).then(() => {
                        alert("Verification email sent. Please check your inbox.");
                    }).catch((error) => {
                        alert("Error sending verification email: " + error.message);
                    });
                } else {
                    // User clicked "Cancel" in the confirmation dialog.
                    // You can choose to do nothing or handle it as needed.
                }
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Error signing in: " + error.message);
        });
});