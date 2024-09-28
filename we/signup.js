import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
import { app } from './app.js';

const auth = getAuth(app);

document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log('User signed up:', userCredential.user);

        // Optionally, you can save additional user information to Firestore
        // const db = getFirestore(app);
        // await setDoc(doc(db, 'users', userCredential.user.uid), {
        //     username: username,
        //     email: email
        // });

        // Redirect to a welcome page or dashboard
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error signing up:', error);
        alert('Failed to sign up. Please check your details and try again.');
    }
});
