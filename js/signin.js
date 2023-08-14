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
    const auth = getAuth(app);

    // Show loader and change button text
    signUpButton.disabled = true; //Rotating loader - Signing up
    signUpButton.textContent = "Signing in..."; //Rotating loader - Signing up
    loader.style.display = "block"; //Rotating loader - Signing up

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;                    
            if (user.emailVerified) {
                // Successful login

                // Clear form fields after successful sign-up
                document.getElementById("password").value = "";

                // Uncheck the "Show password" checkbox
                showPasswordCheckbox.checked = false;

                // Redirect to sign-in page on successful sign-up
                // Delay before redirecting to signin.html
                setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 1000); // 1000 milliseconds

            } else {
                // Display confirmation dialog to resend verification email
                const resendConfirmation = window.confirm("Please verify your email before logging in. Would you like to resend the verification email?");

                // Hide loader and reset button text
                signUpButton.disabled = false; //Rotating loader - Signing up
                signUpButton.textContent = "Sign in"; //Rotating loader - Signing up
                loader.style.display = "none"; //Rotating loader - Signing up

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

            // Hide loader and reset button text
            signUpButton.disabled = false; //Rotating loader - Signing up
            signUpButton.textContent = "Sign in"; //Rotating loader - Signing up
            loader.style.display = "none"; //Rotating loader - Signing up
        });
});