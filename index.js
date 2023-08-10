    // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
    import { createUserWithEmailAndPassword, sendEmailVerification, getAuth } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-auth.js";

    // Your web app's Firebase configuration
    const firebaseConfig = {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID
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