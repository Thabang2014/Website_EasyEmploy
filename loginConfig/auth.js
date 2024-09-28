import { auth } from './app.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = loginForm['email'].value;
    const password = loginForm['password'].value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            alert('Login successful!');
            window.location.href = 'index.html'; // Redirect to index.html
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/user-not-found') {
                alert('User not found. Please sign up first.');
            } else {
                alert(errorMessage);
            }
        });
});
